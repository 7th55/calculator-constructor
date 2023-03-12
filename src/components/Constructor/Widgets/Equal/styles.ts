import styled from '@emotion/styled';
import { StyledWidgetsComponentProps } from 'src/components/Constructor/Widgets/types';

export const StyledEqualWrapper = styled.div<StyledWidgetsComponentProps>`
  display: flex;
  width: 232px;
  height: 52px;

  padding: 3px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  margin: 0 0 5px 0;

  ${({ withShadows }) => (withShadows ? null : 'box-shadow: none;')}
`;

export const StyledEqual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #5d5fef;
  color: #ffff;
  border-radius: 4px;

  font-weight: 500;

  margin: 0 0 5px 0;

  cursor: pointer;
`;
