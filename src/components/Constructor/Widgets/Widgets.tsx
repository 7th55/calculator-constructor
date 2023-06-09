import React, { useEffect } from 'react';
// local
import { actions } from 'src/store/calculatorSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  addWidget,
  removeWidget,
  selectWidgets,
  Widget,
} from 'src/store/widgetsSlice';
// import { proveExhaustiveness } from 'src/typeUtils';
import { Equal } from './Equal';
import { Input } from './Input';
import { Keyboard } from './Keyboard';
import { Operations } from './Operations';
// styles
import { StyldeWidgets, StyledWidgetsItem } from './styles';
// types
import { WidgetProps } from './types';

import { DraggableWidget } from 'src/components/Constructor/DragAndDrop/Draggable/DraggableWidget/DraggableWidget';
import { CustomDragLayer } from '../DragAndDrop/CustomDragLayer';

export const Widgets = ({
  showWidgets = ['input', 'operations', 'keyboard', 'equal'],
  mode,
}: WidgetProps) => {
  const widgets = useAppSelector(selectWidgets);
  console.log(showWidgets, widgets, 'S/W');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actions.resetExpression());
    return () => {
      dispatch(actions.resetExpression());
    };
  }, [dispatch]);
  const isOverlay: boolean = mode === 'add' || mode === 'remove';

  const overlayClickHandler = (
    widgetName: Widget,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (mode === 'add') {
      dispatch(addWidget(widgetName));
    } else if (mode === 'remove' && e.detail === 2) {
      dispatch(removeWidget(widgetName));
    }
  };

  return (
    <StyldeWidgets>
      {showWidgets.map((widgetName, index) => (
        <React.Fragment key={widgetName}>
          <CustomDragLayer snapToGrid={false} widgetName={widgetName} />
          <DraggableWidget
            key={index}
            mode={mode}
            widgetName={widgetName}
            widgetIndex={mode === 'add' ? -1 : index}
          >
            <StyledWidgetsItem
              overlay={isOverlay}
              disabled={mode === 'add' && widgets.includes(widgetName)}
              onClick={
                isOverlay
                  ? overlayClickHandler.bind(null, widgetName)
                  : undefined
              }
            >
              {widgetName === 'input' ? (
                <Input
                  withShadows={mode === 'add' && !widgets.includes(widgetName)}
                />
              ) : widgetName === 'operations' ? (
                <Operations
                  withShadows={mode === 'add' && !widgets.includes(widgetName)}
                />
              ) : widgetName === 'keyboard' ? (
                <Keyboard
                  withShadows={mode === 'add' && !widgets.includes(widgetName)}
                />
              ) : widgetName === 'equal' ? (
                <Equal
                  withShadows={mode === 'add' && !widgets.includes(widgetName)}
                />
              ) : // proveExhaustiveness(widgetName)
              null}
            </StyledWidgetsItem>
          </DraggableWidget>
        </React.Fragment>
      ))}
    </StyldeWidgets>
  );
};
