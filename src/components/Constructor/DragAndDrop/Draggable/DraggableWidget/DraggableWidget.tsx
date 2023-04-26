import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { addWidget, sortableWidgetsList, Widget } from 'src/store/widgetsSlice';
import { useDrag, useDrop } from 'react-dnd';
import { DraggableWidgetProps } from './types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Identifier } from 'dnd-core';
import { StyledDraggableWidget } from './styles';
import { DropLine } from './DropLine';

export type DragItem = {
  widgetIndex: number;
  widgetName: Widget;
};

export const DraggableWidget: FC<DraggableWidgetProps> = ({
  children,
  widgetName,
  widgetIndex,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId, isOver }, drop] = useDrop<
    DragItem,
    { dropWidgetName: Widget; dropWidgetIndex: number },
    { handlerId: Identifier | null; isOver: boolean }
  >({
    accept: ['input', 'operations', 'keyboard', 'equal'],

    collect(monitor) {
      return {
        isOver: monitor.isOver(),
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: () => ({ dropWidgetName: widgetName, dropWidgetIndex: widgetIndex }),
  });

  const [{ item }, drag, preview] = useDrag(() => ({
    type: widgetName,
    item: { widgetIndex, widgetName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{
        dropWidgetName: Widget;
        dropWidgetIndex: number;
      }>();

      if (dropResult) {
        if (mode === 'add') {
          const dropTargetWidgetName = dropResult.dropWidgetName;

          if (dropTargetWidgetName === undefined) {
            dispatch(addWidget(widgetName));
          } else {
            const dropTargetWidgetName = dropResult.dropWidgetName;

            dispatch(
              sortableWidgetsList({
                currentWidgetName: widgetName,
                dropTargetWidgetName,
              })
            );

            item.widgetIndex = dropResult.dropWidgetIndex;
          }
        }
        if (mode === 'remove') {
          const dropTargetWidgetName = dropResult.dropWidgetName;

          if (dropTargetWidgetName === undefined) return;

          item.widgetIndex = dropResult.dropWidgetIndex;
          dispatch(
            sortableWidgetsList({
              currentWidgetName: widgetName,
              dropTargetWidgetName,
            })
          );
        }
      }
    },
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Sortable list
  if (mode === 'remove') {
    drag(drop(ref));
  }

  if (mode === 'add') {
    drag(ref);
  }

  return (
    <StyledDraggableWidget
      ref={mode === 'show' ? null : ref}
      data-handler-id={handlerId}
    >
      <DropLine
        mode={mode === 'remove'}
        index={widgetIndex}
        dropIndex={isOver ? item.widgetIndex : null}
      >
        {children}
      </DropLine>
    </StyledDraggableWidget>
  );
};
