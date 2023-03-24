import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

export type Widget = 'input' | 'operations' | 'keyboard' | 'equal';
export type Widgets = Array<Widget>;

type WidgetsState = {
  widgetsList: Widgets;
};
const initialState: WidgetsState = {
  widgetsList: [],
};

export const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      if (state.widgetsList.includes(action.payload)) return;
      state.widgetsList =
        action.payload === 'input'
          ? [action.payload, ...state.widgetsList]
          : [...state.widgetsList, action.payload];
    },
    removeWidget: (state, action: PayloadAction<Widget>) => {
      state.widgetsList = state.widgetsList.filter(
        (item) => item !== action.payload
      );
    },
    sortableWidgetsList: (state, action) => {
      const { currentWidgetName, dropTargetWidgetName } = action.payload;

      // Did copy the widget list for immutability
      const widgetListCopy = state.widgetsList.concat();

      // If a current widget and a drop widget are same ones
      if (currentWidgetName === dropTargetWidgetName) return;

      // The fixed input case if we didn't find input index in the widget list
      if (
        currentWidgetName === 'input' &&
        widgetListCopy.includes('input') === false
      ) {
        state.widgetsList = ['input', ...widgetListCopy];
        return;
      }

      // If we try to replace the input a current widget will be add under the input
      if (dropTargetWidgetName === 'input') {
        // Check a current widget in the widget list
        //
        // If widget is absent we just add a current widget in the list.
        // Otherwise we cut a current widget and then add it to the list.
        if (widgetListCopy.includes(currentWidgetName)) {
          widgetListCopy.splice(widgetListCopy.indexOf(currentWidgetName), 1);
        }

        widgetListCopy.splice(widgetListCopy.indexOf('input'), 1);

        state.widgetsList = ['input', currentWidgetName, ...widgetListCopy];

        return;
      }

      // The fixed input general case
      if (dropTargetWidgetName === 'input' || currentWidgetName === 'input') {
        return;
      }

      const currentWidgetIndex = widgetListCopy.indexOf(currentWidgetName);
      const dropWidgetIndex = widgetListCopy.indexOf(dropTargetWidgetName);

      // If a current widget isn't in the widget list
      if (widgetListCopy.includes(currentWidgetName) === false) {
        widgetListCopy.splice(dropWidgetIndex, 1, currentWidgetName);

        widgetListCopy.splice(
          widgetListCopy.indexOf(currentWidgetName) + 1,
          0,
          dropTargetWidgetName
        );

        state.widgetsList = widgetListCopy;

        return;
      }

      // Cut a drop target widget and add a current widget instead cutted
      widgetListCopy.splice(dropWidgetIndex, 1, currentWidgetName);
      // Cut current widget
      widgetListCopy.splice(currentWidgetIndex, 1);

      // Upward movements
      if (currentWidgetIndex > dropWidgetIndex) {
        // Move forward to one widget
        if (currentWidgetIndex === dropWidgetIndex + 1) {
          widgetListCopy.splice(currentWidgetIndex, 0, dropTargetWidgetName);

          state.widgetsList = widgetListCopy;

          return;
        }

        // Move forward to more than one widget
        widgetListCopy.splice(currentWidgetIndex - 1, 0, dropTargetWidgetName);

        state.widgetsList = widgetListCopy;
      }

      // Downward movements
      if (currentWidgetIndex < dropWidgetIndex) {
        // Move backward to one widget
        if (currentWidgetIndex === dropWidgetIndex - 1) {
          widgetListCopy.splice(currentWidgetIndex, 0, dropTargetWidgetName);

          state.widgetsList = widgetListCopy;

          return;
        }

        // Move backward to more than one widget
        widgetListCopy.splice(currentWidgetIndex + 1, 0, dropTargetWidgetName);

        state.widgetsList = widgetListCopy;
      }
    },
  },
});

export const { addWidget, removeWidget, sortableWidgetsList } =
  widgetsSlice.actions;

export const selectWidgets = (state: RootState) => state.widgets.widgetsList;

export default widgetsSlice.reducer;
