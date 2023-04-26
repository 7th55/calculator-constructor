import { Widget } from '@/store/widgetsSlice';

export type DraggableWidgetProps = {
  children: JSX.Element;
  widgetName: Widget;
  widgetIndex: number;
  mode: 'add' | 'remove' | 'show';
};

export type DropLineProps = {
  children: JSX.Element;
  mode: boolean;
  index: number;
  dropIndex: number | null;
};
