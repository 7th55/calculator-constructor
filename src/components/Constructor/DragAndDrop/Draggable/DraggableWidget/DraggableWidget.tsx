import React, { FC, useEffect, useRef } from 'react';
import {
  useAppDispatch,
  // useAppSelector
} from 'src/app/hooks';
import {
  addWidget,
  // selectWidgets,
  sortableWidgetsList,
  Widget,
} from 'src/store/widgetsSlice';
import { useDrag, useDrop } from 'react-dnd';
import { DraggableWidgetProps } from './types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Identifier } from 'dnd-core';
// import { DropLine } from './DropLine';

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
  // const widgets = useAppSelector(selectWidgets);

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [
    {
      handlerId,
      // isOver
    },
    drop,
  ] = useDrop<
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

  const [
    // {
    //   item
    // }
    ,
    drag,
    preview,
  ] = useDrag(() => ({
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
    <div
      ref={mode === 'show' ? null : ref}
      data-handler-id={handlerId}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* <DropLine
        isOver={isOver}
        widgetsLength={widgets.length}
        widgetName={widgetName}
        widgetIndex={widgetIndex}
        dragItemWidgetName={isOver === true ? item.widgetName : null}
        dragItemWidgetIndex={isOver === true ? item.widgetIndex : null}
      > */}
      {children}
      {/* </DropLine> */}
    </div>
  );
};
