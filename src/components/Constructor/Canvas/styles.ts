import styled from '@emotion/styled';
import { StyledCanvasProps } from './types';
// Images
import canvasIconImg from 'src/img/canvas-icon.svg';

export const StyledCanvas = styled.div<StyledCanvasProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 244px;
  height: 426px;

  margin: 0 0 0 60px;
  // TODO: rename to showBorder
  ${({ widgetsEmpty }) =>
    widgetsEmpty ? 'outline: 4px dashed #e2e3e5;' : null}
  ${({ ghostLeft }) =>
    ghostLeft
      ? `
      margin-left: calc(244px + 60px);
   
      `
      : null}
`;

export const StyledCanvasList = styled.div``;

export const StyledCanvasText = styled.div`
  position: relative;
  top: 191px;

  text-align: center;
  font-weight: 400;
  line-height: 14.52px;
  font-size: 12px;
  color: #6b7280;
`;
export const StyledCanvasTextSpan = styled.span`
  position: relative;
  font-weight: 500;
  line-height: 16.94px;
  font-size: 14px;
  color: #5d5fef;

  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -25px;
    left: 50px;
    background-image: url(${canvasIconImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px;
  }
`;
