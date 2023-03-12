import React from 'react';
// local
import { useAppDispatch } from 'src/app/hooks';
import { actions } from 'src/store/calculatorSlice';
// styles
import { StyledEqual, StyledEqualWrapper } from './styles';
// types
import { WidgetsComponentProps } from 'src/components/Constructor/Widgets/types';

export const Equal = ({ withShadows = false }: WidgetsComponentProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledEqualWrapper withShadows={withShadows}>
      <StyledEqual
        onClick={() => {
          dispatch(actions.calcStack());
        }}
      >
        =
      </StyledEqual>
    </StyledEqualWrapper>
  );
};
