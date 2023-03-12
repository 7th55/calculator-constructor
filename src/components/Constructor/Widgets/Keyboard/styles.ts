import styled from '@emotion/styled';
import { StyledWidgetsComponentProps } from 'src/components/Constructor/Widgets/types';

export const StyledKeyboard = styled.div<StyledWidgetsComponentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  width: 238px;
  height: 224px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  margin: 0 0 5px 0;

  cursor: pointer;

  ${({ withShadows }) => (withShadows ? null : 'box-shadow: none;')}
`;

export const StyledKeyboardButton = styled.div<{ doubleWidth: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ doubleWidth }) => (doubleWidth ? 'width: 64%;' : 'width: 31%;')}
  height: 22%;

  margin: 0 5px 0 0;
  :nth-child(3n + 3),
  :nth-child(11) {
    margin: 0;
  }

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
`;
