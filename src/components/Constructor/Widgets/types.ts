import { Widgets } from 'src/store/widgetsSlice';

export type WidgetProps = {
  showWidgets?: Widgets;
  mode: 'add' | 'remove' | 'show';
};

export type WidgetsComponentProps = {
  withShadows?: boolean;
};

export type StyledWidgetsComponentProps = {
  withShadows: boolean;
};
