import React, { CSSProperties, FC, useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { addWidget, Widget } from 'src/store/widgetsSlice';
import { useDrag } from 'react-dnd';
import { DraggableWidgetProps } from './types';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const DraggableWidget: FC<DraggableWidgetProps> = ({
  children,
  widgetName,
}) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: widgetName,
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

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return <div ref={drag}>{children}</div>;
};
