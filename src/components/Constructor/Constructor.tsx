import React, { useState } from 'react';
import { Canvas } from './Canvas/index';
import {
  StyledConstructor,
  StyledConstructorSwitcher,
  StyledConstructorSwitcherWrapper,
  StyledConstructorWidgetsAndCanvas,
  StyledModeSwitchButton,
} from './styles';
import { Widgets } from './Widgets/index';

export const Constructor = () => {
  const [mode, setMode] = useState<'runtime' | 'constructor'>('constructor');

  return (
    <>
      <StyledConstructor>
        <>
          <StyledConstructorSwitcherWrapper>
            <StyledConstructorSwitcher
              onClick={() =>
                setMode(mode === 'runtime' ? 'constructor' : 'runtime')
              }
            >
              <StyledModeSwitchButton
                isActive={mode === 'runtime'}
                mode="runtime"
              >
                Runtime
              </StyledModeSwitchButton>
              <StyledModeSwitchButton
                isActive={mode === 'constructor'}
                mode="constructor"
              >
                Constructor
              </StyledModeSwitchButton>
            </StyledConstructorSwitcher>
          </StyledConstructorSwitcherWrapper>

          <StyledConstructorWidgetsAndCanvas>
            {mode === 'constructor' ? (
              <Widgets
                key={mode}
                mode="add"
              />
            ) : null}
            <Canvas mode={mode} />
          </StyledConstructorWidgetsAndCanvas>
        </>
      </StyledConstructor>
    </>
  );
};
