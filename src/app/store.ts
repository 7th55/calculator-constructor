import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// stote
import widgetsReduscer from 'src/store/widgetsSlice';
import calculatorReducer from 'src/store/calculatorSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetsReduscer,
    calculator: calculatorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
