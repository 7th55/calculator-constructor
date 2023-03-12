import React from 'react';
// local
import { useAppDispatch } from 'src/app/hooks';
import { actions, Digit } from 'src/store/calculatorSlice';
// styles
import { StyledKeyboard, StyledKeyboardButton } from './styles';
// types
import { WidgetsComponentProps } from 'src/components/Constructor/Widgets/types';

export const Keyboard = ({ withShadows = false }: WidgetsComponentProps) => {
  const dispatch = useAppDispatch();

  const numbers: Array<Digit | ','> = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];

  return (
    <StyledKeyboard withShadows={withShadows}>
      {numbers.map((num) => (
        <StyledKeyboardButton
          // TODO: Add prop doubleWidth
          key={num}
          doubleWidth={num === 0}
          onClick={() => {
            dispatch(
              num === ','
                ? actions.pushDigitToStack('fraction')
                : actions.pushDigitToStack(num)
            );
          }}
        >
          {num}
        </StyledKeyboardButton>
      ))}
    </StyledKeyboard>
  );
};
