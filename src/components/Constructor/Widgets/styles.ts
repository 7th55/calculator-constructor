import styled from '@emotion/styled';

export const StyldeWidgets = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 244px;
  height: 426px;
`;

export const StyledWidgetsItem = styled.div<{
  overlay: boolean;
  disabled: boolean;
}>`
  position: relative;

  ${({ overlay }) =>
    overlay
      ? `
 user-select: none;

 &::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
 }
`
      : null}

  ${({ disabled }) => (disabled ? 'opacity: 50%;' : null)}
`;
