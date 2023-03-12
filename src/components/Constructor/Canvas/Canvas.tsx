import React from 'react';
// store
import { useAppSelector } from 'src/app/hooks';
import { selectWidgets } from 'src/store/widgetsSlice';
// styles
import {
  StyledCanvas,
  StyledCanvasList,
  StyledCanvasText,
  StyledCanvasTextSpan,
} from './styles';
import { Widgets } from '../Widgets';

export const Canvas = ({ mode }: { mode: 'runtime' | 'constructor' }) => {
  const widgets = useAppSelector(selectWidgets);

  return (
    <>
      <StyledCanvas
        ghostLeft={mode === 'runtime'}
        widgetsEmpty={widgets.length === 0 && mode !== 'runtime'}
      >
        <StyledCanvasList>
          {widgets.length === 0 && mode !== 'runtime' ? (
            <StyledCanvasText>
              <StyledCanvasTextSpan>Перетащите сюда</StyledCanvasTextSpan>
              <br />
              любой элемент
              <br />
              из левой панели
            </StyledCanvasText>
          ) : (
            <Widgets
              showWidgets={widgets}
              mode={mode === 'runtime' ? 'show' : 'remove'}
            />
          )}
        </StyledCanvasList>
      </StyledCanvas>
    </>
  );
};
