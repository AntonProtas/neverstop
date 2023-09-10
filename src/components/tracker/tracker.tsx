//libs
import cn from 'classnames';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

//components
import { TrackForm, TrackFormValues } from 'components/track-form/track-form';
//helpers
import { getIsMobile } from 'helpers/common';
import { DragItem, boxButtonsAnimation, buttonAnimation, hoverDndElement } from './tracker.helpers';
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

export type TrackerProps = {
  index: number;
  tracker: Tracker;
  onEdit: (tracker: Tracker) => void;
  onDelete: (tracker: Tracker) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onTrackModeOpen: (tracker: Tracker) => void;
  onTrackModeClose: () => void;
  onTrackSubmit: (widgetId: string, value: number) => void;
  isTrackMode?: boolean;
};

export function Tracker({
  index,
  tracker,
  onEdit,
  onDelete,
  onMove,
  onTrackModeOpen,
  onTrackModeClose,
  onTrackSubmit,
  isTrackMode = true,
}: TrackerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'card',
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: DragItem, monitor) =>
      hoverDndElement({ index, item, monitor, elementRef: ref, onMove }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => ({ id: tracker.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const editClick = () => onEdit(tracker);
  const deleteClick = () => onDelete(tracker);
  const trackModeOpen = () => onTrackModeOpen(tracker);
  const submitTracking = (data: TrackFormValues) => {
    onTrackSubmit(tracker.id, tracker.value + data.value);
    onTrackModeClose();
  };

  return (
    <div
      className={cn(s.box, { [s.isDragging]: isDragging })}
      ref={ref}
      style={{ opacity: isDragging ? (getIsMobile() ? 0.1 : 0) : 1 }}
      data-handler-id={handlerId}
    >
      {isTrackMode ? (
        <TrackForm onSubmit={submitTracking} tracker={tracker} onClose={onTrackModeClose} />
      ) : (
        <>
          <motion.div variants={boxButtonsAnimation} initial="hidden" animate="visible">
            {tracker.target_value > tracker.value && (
              <motion.button variants={buttonAnimation} onClick={trackModeOpen}>
                add
              </motion.button>
            )}
            <motion.button variants={buttonAnimation} onClick={deleteClick}>
              delete
            </motion.button>
            <motion.button variants={buttonAnimation} onClick={editClick}>
              edit
            </motion.button>
          </motion.div>
          <div className={s.fields}>
            <span>Target Value: {tracker.target_value}</span>
            <span>Initial Value: {tracker.initial_value}</span>
            <span>Current Value: {tracker.value}</span>
            <span>Name: {tracker.name}</span>
            <span>Unit: {tracker.unit}</span>
          </div>
        </>
      )}
    </div>
  );
}
