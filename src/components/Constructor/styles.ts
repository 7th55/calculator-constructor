import styled from '@emotion/styled';
// Image
import selectorEnableImg from 'src/img/selector-enable.svg';
import selectorDisableImg from 'src/img/selector-disable.svg';
import eyeEnableImg from 'src/img/eye-enable.svg';
import eyeDisableImg from 'src/img/eye-disable.svg';
export const StyledConstructor = styled.div`
  width: 695px;
  height: 426px;
  padding: 40px 0;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
`;
export const StyledConstructorWidgetsAndCanvas = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

export const StyledConstructorSwitcherWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 79%;
  margin: 0 0 20px 0;
`;

export const StyledConstructorSwitcher = styled.div`
  background-color: #f3f4f6;
  border-radius: 5px;
  padding: 1px;
`;

export const StyledModeSwitchButton = styled.button<{
  isActive: boolean;
  mode: 'constructor' | 'runtime';
}>`
  position: relative;

  height: 33px;

  ${({ mode, isActive }) =>
    mode === 'constructor'
      ? `
  width: 140px;
   &::before {
   background-image: ${
     isActive ? `url(${selectorEnableImg})` : ` url(${selectorDisableImg})`
   };
   }
   
  `
      : `
  width: 110px;
   &::before {
   background-image: ${
     isActive ? `url(${eyeEnableImg})` : ` url(${eyeDisableImg})`
   };
   }
  
  `}

  padding: 0 0 0 25px;

  border-radius: 5px;

  font-weight: 500;
  font-size: 14px;

  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 6px;
    left: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 18px;
  }

  background-color: #f3f4f6;
  color: #4d5562;
  border: 0.5px solid #f3f4f6;

  ${({ isActive }) =>
    isActive
      ? `

    background-color: #ffffff;
    color: #4d5562;

    border-color: #e2e3e4;
  `
      : null}
`;
