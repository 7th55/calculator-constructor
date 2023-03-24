import { Widget } from '@/store/widgetsSlice';
import { CSSProperties, FC } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { Equal } from '../Widgets/Equal';
import { Input } from '../Widgets/Input';
import { Keyboard } from '../Widgets/Keyboard';
import { Operations } from '../Widgets/Operations';
import { snapToGrid } from './snapToGrid';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isSnapToGrid: boolean
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export type CustomDragLayerProps = {
  snapToGrid: boolean;
  widgetName: Widget;
};
export const CustomDragLayer: FC<CustomDragLayerProps> = ({ snapToGrid }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  function renderItem() {
    switch (itemType) {
      case 'input':
        return <Input withShadows={false} withBackgroundColor={true} />;
      case 'operations':
        return <Operations withShadows={false} withBackgroundColor={true} />;
      case 'keyboard':
        return <Keyboard withShadows={false} withBackgroundColor={true} />;
      case 'equal':
        return <Equal withShadows={false} withBackgroundColor={true} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, snapToGrid)}>
        {renderItem()}
      </div>
    </div>
  );
};
