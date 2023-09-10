import { DropTargetMonitor } from 'react-dnd';

export type DragItem = {
  index: number;
  id: string;
  type: string;
};

export type XYCoord = {
  x: number;
  y: number;
};

export const boxButtonsAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const buttonAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export type HoverDndElementType = {
  index: number;
  item: DragItem;
  monitor: DropTargetMonitor;
  elementRef: React.RefObject<HTMLDivElement>;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

export function hoverDndElement({ index, item, monitor, elementRef, onMove }: HoverDndElementType) {
  if (!elementRef.current) {
    return;
  }

  const dragIndex = item.index;
  const hoverIndex = index;

  if (dragIndex === hoverIndex) {
    return;
  }

  const hoverBoundingRect = elementRef.current?.getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    return;
  }

  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    return;
  }

  onMove(dragIndex, hoverIndex);
  item.index = hoverIndex;
}
