import React from 'react';
// local
import { useAppSelector } from 'src/app/hooks';
import {
  selectExpression,
  selectHasGhostFraction,
} from 'src/store/calculatorSlice';
// styles
import { StyledInput, StyledInputWrapper } from './styles';
// types
import { WidgetsComponentProps } from 'src/components/Constructor/Widgets/types';

export const Input = ({
  withShadows = false,
  withBackgroundColor = false,
}: WidgetsComponentProps) => {
  const expression = useAppSelector(selectExpression);
  const hasGhostFraction = useAppSelector(selectHasGhostFraction);

  const value: string =
    expression === Infinity || isNaN(expression)
      ? 'Не определено'
      : expression.toString().replace('.', ',') + (hasGhostFraction ? ',' : '');

  return (
    <StyledInputWrapper
      withShadows={withShadows}
      withBackgroundColor={withBackgroundColor}
    >
      <StyledInput digitsCount={value.replace(',', '').length}>
        {value}
      </StyledInput>
    </StyledInputWrapper>
  );
};
