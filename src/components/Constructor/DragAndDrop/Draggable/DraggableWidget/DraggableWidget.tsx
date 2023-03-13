import React from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { addWidget, Widget } from 'src/store/widgetsSlice';
import { useDrag } from 'react-dnd';

export const DraggableWidget = ({
  children,
  widgetName,
}: {
  children: JSX.Element;
  widgetName: Widget;
}) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'WIDGET',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        dispatch(addWidget(widgetName));
      }
    },
  }));

  return isDragging ? (
    <div ref={dragPreview}>{children}</div>
  ) : (
    <div ref={drag}>{children}</div>
  );
};
