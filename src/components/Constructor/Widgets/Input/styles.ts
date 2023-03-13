import styled from '@emotion/styled';
import { StyledWidgetsComponentProps } from '../types';

export const StyledInputWrapper = styled.div<StyledWidgetsComponentProps>`
  display: flex;
  width: 232px;
  height: 52px;

  padding: 3px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  margin: 0 0 5px 0;

  cursor: pointer;

  ${({ withShadows }) => (withShadows ? null : 'box-shadow: none;')}
`;

export const StyledInput = styled.div<{ digitsCount: number }>`
  box-sizing: border-box;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;

  line-height: 44px;

  display: block;

  width: 100%;
  max-width: 100%;
  height: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  white-space: nowrap;

  background-color: #f3f4f6;
  border-radius: 6px;
  padding: 4px 15px;

  cursor: pointer;

  ${({ digitsCount }) =>
    digitsCount > 8 ? 'font-size: 19px;' : 'font-size: 36px;'}
`;
