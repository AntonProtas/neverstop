//libs
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
//styles
import s from './tracker.module.css';

export type Tracker = {
  id: string;
  name: string;
  value: number;
  initial_value: number;
  target_value: number;
  unit: string;
  finish_notes?: string;
  not_finish_notes?: string;
  reward?: string;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}
interface XYCoord {
  x: number;
  y: number;
}

export type TrackerProps = {
  index: number;
  tracker: Tracker;
  onEdit: (tracker: Tracker) => void;
  onDelete: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

export function Tracker({ index, tracker, onEdit, onDelete, onMove }: TrackerProps) {
  const dragRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!previewRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = previewRef.current?.getBoundingClientRect();
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
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'card',
    item: () => {
      return { id: tracker.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);
  drop(preview(previewRef));

  const editClick = () => onEdit(tracker);
  const deleteClick = () => onDelete(tracker.id);

  return (
    <div
      className={s.box}
      ref={previewRef}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <div>
        <button onClick={deleteClick}>delete</button>
        <button onClick={editClick}>edit</button>
        <button ref={dragRef} className={s.moveButton}>
          move
        </button>
      </div>
      <div className={s.fields}>
        <span>Name: {tracker.name}</span>
        <span>Target Value: {tracker.target_value}</span>
        <span>Initial Value: {tracker.initial_value}</span>
        <span>Current Value: {tracker.value}</span>
        <span>Unit: {tracker.unit}</span>
        <span>Finish Notes: {tracker.finish_notes}</span>
        <span>Not Finish Notes: {tracker.not_finish_notes}</span>
        <span>Reward: {tracker.reward}</span>
      </div>
    </div>
  );
}
