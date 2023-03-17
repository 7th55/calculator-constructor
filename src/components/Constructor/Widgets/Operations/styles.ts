import styled from '@emotion/styled';
import { StyledWidgetsComponentProps } from 'src/components/Constructor/Widgets/types';

export const StyledOperations = styled.div<StyledWidgetsComponentProps>`
  display: flex;
  align-items: center;
  width: 232px;
  height: 52px;
  padding: 3px;
  margin: 0 0 5px 0;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  cursor: pointer;

  ${({ withShadows }) => (withShadows ? null : 'box-shadow: none; ')}
  ${({ withBackgroundColor }) =>
    withBackgroundColor ? null : 'background-color: rgba(255, 255, 255, 0)'}
`;

type StyledOperationsButtonProps = {
  isActive: boolean;
};
export const StyledOperationsButton = styled.button<StyledOperationsButtonProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;

  margin: 0 5px 0 0;
  &:last-child {
    margin: 0;
  }

  background-color: white;
  border: 1px solid #e2e3e5;
  border-radius: 6px;

  font-weight: 500;

  cursor: pointer;

  &:active {
    color: #ffffff;
    background-color: #5d5fef;
  }

  &:hover {
    border-width: 2px;
    border-color: #5d5fef;
  }

  ${({ isActive }) =>
    !isActive
      ? null
      : `
    border-width: 2px;
    border-color: #5d5fef
  `}
`;
