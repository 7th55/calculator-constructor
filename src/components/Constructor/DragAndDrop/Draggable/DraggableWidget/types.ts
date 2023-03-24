import { Widget } from '@/store/widgetsSlice';

export type DraggableWidgetProps = {
  children: JSX.Element;
  widgetName: Widget;
  widgetIndex: number;
  mode: 'add' | 'remove' | 'show';
};

export type DropLineProps = {
  children: JSX.Element;
  isOver: boolean;
  widgetsLength: number;
  dragItemWidgetName: string | null;
  dragItemWidgetIndex: number | null;
  widgetName: string;
  widgetIndex: number;
};
