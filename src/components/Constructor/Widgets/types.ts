import { Widgets } from 'src/store/widgetsSlice';

export type WidgetProps = {
  showWidgets?: Widgets;
  mode: 'add' | 'remove' | 'show';
};

export type WidgetsComponentProps = {
  withShadows?: boolean;
  withBackgroundColor?: boolean;
};

export type StyledWidgetsComponentProps = {
  withShadows: boolean;
  withBackgroundColor?: boolean;
};
