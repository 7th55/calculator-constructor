import styled from '@emotion/styled';
import dndLineImg from 'src/img/dnd-line.svg';

export const StyledDraggableWidget = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledDropLine = styled.div<{
  borderTop: boolean;
  borderBottom: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;

  ${({ borderTop }) =>
    borderTop &&
    `
  &:before {
    position: absolute;
    top: -5px;
    content: '';
    width: 100%;
    height: 10px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(${dndLineImg});
  `}

  ${({ borderBottom }) =>
    borderBottom &&
    `
  &:after {
    position: absolute;
    bottom: -8px;
    content: '';
    width: 100%;
    height: 10px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(${dndLineImg});
  }
  `}
`;
