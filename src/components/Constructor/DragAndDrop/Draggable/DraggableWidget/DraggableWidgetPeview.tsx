import React, { FC } from 'react';
import { DraggableWidget } from './DraggableWidget';
import { DraggableWidgetProps } from './types';

export const DraggableWidgetPreview: FC<DraggableWidgetProps> = ({
  children,
  widgetName,
}) => {
  return (
    <div style={{ backgroundColor: 'purple' }}>
      <DraggableWidget widgetName={widgetName}>{children}</DraggableWidget>
    </div>
  );
};
