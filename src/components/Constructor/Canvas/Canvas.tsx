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
import { DroppableCanvas } from '../DragAndDrop/Droppable/DroppableCanvas/DroppableCanvas';

export const Canvas = ({ mode }: { mode: 'runtime' | 'constructor' }) => {
  const widgets = useAppSelector(selectWidgets);

  return (
    <>
      <StyledCanvas
        ghostLeft={mode === 'runtime'}
        widgetsEmpty={widgets.length === 0 && mode !== 'runtime'}
      >
        <DroppableCanvas>
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
                key={mode}
                showWidgets={widgets}
                mode={mode === 'runtime' ? 'show' : 'remove'}
              />
            )}
          </StyledCanvasList>
        </DroppableCanvas>
      </StyledCanvas>
    </>
  );
};
