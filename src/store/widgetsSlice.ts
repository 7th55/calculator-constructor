import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
export type Widget = 'input' | 'operations' | 'keyboard' | 'equal';
export type Widgets = Array<Widget>;

type WidgetsState = {
  // TODO: rename to widgetsList
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
  },
});

export const { addWidget, removeWidget } = widgetsSlice.actions;

export const selectWidgets = (state: RootState) => state.widgets.widgetsList;

export default widgetsSlice.reducer;
