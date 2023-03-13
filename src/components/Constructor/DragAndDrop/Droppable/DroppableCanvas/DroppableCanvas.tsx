import React from 'react';
import { useDrop } from 'react-dnd';

export const DroppableCanvas = ({ children }: { children: JSX.Element }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'WIDGET',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#F0F9FF' : 'white',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};
