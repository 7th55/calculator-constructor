import React from 'react';
// local
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { actions, selectLastOperator } from 'src/store/calculatorSlice';
// types
import { WidgetsComponentProps } from 'src/components/Constructor/Widgets/types';
// styles
import { StyledOperations, StyledOperationsButton } from './styles';

export const Operations = ({ withShadows = false }: WidgetsComponentProps) => {
  const dispatch = useAppDispatch();
  const lastOperator = useAppSelector(selectLastOperator);

  return (
    <div>
      <StyledOperations withShadows={withShadows}>
        <StyledOperationsButton
          isActive={lastOperator === '/'}
          onClick={() => {
            dispatch(actions.pushOperatorToStack('/'));
          }}
        >
          /
        </StyledOperationsButton>
        <StyledOperationsButton
          isActive={lastOperator === '×'}
          onClick={() => {
            dispatch(actions.pushOperatorToStack('×'));
          }}
        >
          ×
        </StyledOperationsButton>
        <StyledOperationsButton
          isActive={lastOperator === '-'}
          onClick={() => {
            dispatch(actions.pushOperatorToStack('-'));
          }}
        >
          -
        </StyledOperationsButton>
        <StyledOperationsButton
          isActive={lastOperator === '+'}
          onClick={() => {
            dispatch(actions.pushOperatorToStack('+'));
          }}
        >
          +
        </StyledOperationsButton>
      </StyledOperations>
    </div>
  );
};
