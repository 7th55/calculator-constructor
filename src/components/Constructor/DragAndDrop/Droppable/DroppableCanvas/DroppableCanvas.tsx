import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppSelector } from 'src/app/hooks';
import { selectWidgets } from 'src/store/widgetsSlice';
import dndLineImg from 'src/img/dnd-line.svg';

export const DroppableCanvas = ({ children }: { children: JSX.Element }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['input', 'operations', 'keyboard', 'equal'],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const widgets = useAppSelector(selectWidgets);

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        backgroundColor: isOver && widgets.length === 0 ? '#F0F9FF' : 'white',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
      }}
    >
      {children}
      {isOver && widgets.length ? (
        <span
          style={{
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '6px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundImage: `url(${dndLineImg})`,
          }}
        ></span>
      ) : null}
    </div>
  );
};
