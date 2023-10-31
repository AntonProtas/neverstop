//libs
import cn from 'classnames';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
//components
import { TrackForm, TrackFormValues } from 'components/track-form/track-form';
//helpers
import { getIsMobile } from 'helpers/common';
import { DragItem, hoverDndElement } from './tracker.helpers';
//styles
import s from './tracker.module.css';
import { ProgressBar } from 'components/progress-bar/progress-bar';

import {
  BsPlusCircleFill,
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillEyeFill,
  BsThreeDots,
  BsXLg,
} from 'react-icons/bs';
import {
  boxButtonsAnimation,
  buttonAnimation,
  formAnimation,
  setAnimation,
} from 'helpers/animation';
import { Button } from 'ui/button/button';

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
  onView: (tracker: Tracker) => void;
  onTrackModeOpen: (tracker: Tracker) => void;
  onTrackModeClose: () => void;
  onTrackSubmit: (widgetId: string, value: number) => void;
  isTrackMode?: boolean;
  isOpenControls?: boolean;
  onOpenControls?: () => void;
  onCloseControls?: () => void;
};

export function Tracker({
  index,
  tracker,
  onEdit,
  onDelete,
  onMove,
  onView,
  onTrackModeOpen,
  onTrackModeClose,
  onTrackSubmit,
  isTrackMode = true,
  isOpenControls = false,
  onOpenControls,
  onCloseControls,
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
  const viewClick = () => onView(tracker);
  const submitTracking = (data: TrackFormValues) => {
    onTrackSubmit(tracker.id, tracker.value + data.value);
    onTrackModeClose();
  };

  return (
    <div
      className={cn(s.box, { [s.isDragging]: isDragging, [s.withControls]: isOpenControls })}
      ref={ref}
      style={{ opacity: isDragging ? (getIsMobile() ? 0.1 : 0) : 1 }}
      data-handler-id={handlerId}
    >
      {isTrackMode ? (
        <motion.div
          style={{
            height: '100%',
          }}
          variants={setAnimation(formAnimation)}
          initial="hidden"
          animate="visible"
        >
          <TrackForm onSubmit={submitTracking} tracker={tracker} onClose={onTrackModeClose} />
        </motion.div>
      ) : (
        <>
          <div className={s.header}>
            <span className={s.title}>{tracker.name}</span>
            <Button
              className={s.dotsButton}
              icon={isOpenControls ? <BsXLg /> : <BsThreeDots />}
              onClick={isOpenControls ? onCloseControls : onOpenControls}
            />
          </div>
          <ProgressBar
            className={s.progress}
            value={tracker.value}
            start={tracker.initial_value}
            end={tracker.target_value}
            unit={tracker.unit}
          />
        </>
      )}
      {isOpenControls && (
        <motion.div
          className={s.controls}
          variants={setAnimation(boxButtonsAnimation)}
          initial="hidden"
          animate="visible"
        >
          {tracker.target_value > tracker.value && (
            <Button
              className={s.button}
              variants={setAnimation(buttonAnimation)}
              onClick={trackModeOpen}
              icon={<BsPlusCircleFill color="#739993" />}
            >
              add
            </Button>
          )}
          <Button
            className={s.button}
            variants={setAnimation(buttonAnimation)}
            onClick={editClick}
            icon={<BsFillPencilFill color="#E6B188" />}
          >
            edit
          </Button>
          <Button
            className={s.button}
            variants={setAnimation(buttonAnimation)}
            onClick={viewClick}
            icon={<BsFillEyeFill color="#525475" />}
          >
            view
          </Button>
          <Button
            className={s.button}
            variants={setAnimation(buttonAnimation)}
            onClick={deleteClick}
            icon={<BsFillTrashFill color="#D18080" />}
          >
            delete
          </Button>
        </motion.div>
      )}
    </div>
  );
}
