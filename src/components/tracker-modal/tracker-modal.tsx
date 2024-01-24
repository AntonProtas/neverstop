import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BsX } from 'react-icons/bs';

import type { Tracker } from 'components/tracker/tracker';
import { Button } from 'ui/button/button';
import { Input } from 'ui/input/input';
import { Modal } from 'ui/modal/modal';
import { Textarea } from 'ui/textarea/textarea';
import { getFormError } from 'helpers/forms';

import s from './tracker-modal.module.css';

type TrackerModalProps = {
  onSubmit: (tracker: Tracker) => void;
  onClose: () => void;
  isOpen: boolean;
  isEdit?: boolean;
  tracker?: Tracker;
};

const DEFAULT_TRACKER = {
  name: '',
  value: 0,
  initial_value: 0,
  target_value: 10,
  unit: 'times(s)',
  finish_notes: '',
  not_finish_notes: '',
  reward: '',
};

export function TrackerModal({
  onSubmit,
  onClose,
  isOpen,
  isEdit = false,
  tracker,
}: TrackerModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Tracker>({
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(tracker ? { ...tracker } : DEFAULT_TRACKER);
  }, [tracker, reset]);

  const targetValue = watch('target_value');
  const initialValue = watch('initial_value');

  return (
    <Modal
      className={s.modal}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
      isOpen={isOpen}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Button
          className={s.closeButton}
          onClick={onClose}
          icon={<BsX color="var(--second-text)" />}
        />
        <Input
          label="Name*"
          placeholder="Name"
          {...register('name', { required: true })}
          error={getFormError('name', errors.name?.type)}
        />
        <Input
          type="number"
          label="Goal*"
          placeholder="Goal"
          {...register('target_value', {
            valueAsNumber: true,
            required: true,
            min: 1,
          })}
          error={getFormError('goal', errors.target_value?.type)}
        />
        <Input
          type="number"
          label="Start point*"
          placeholder="Start point"
          {...register('initial_value', {
            valueAsNumber: true,
            required: true,
            max: targetValue,
            min: 0,
          })}
          error={getFormError('start point', errors.initial_value?.type)}
        />
        <Input
          type="number"
          label="Current progress*"
          placeholder="Current progress"
          {...register('value', {
            valueAsNumber: true,
            required: true,
            max: targetValue,
            min: initialValue || 0,
          })}
          error={getFormError('current progress', errors.value?.type)}
        />
        <Input
          label="Reward"
          placeholder="Reward"
          {...register('reward', { maxLength: 125 })}
          error={getFormError('reward', errors.reward?.type)}
        />
        <Textarea
          label="What positive outcomes will there be if you do it?"
          placeholder="Finish notes"
          {...register('finish_notes', {
            maxLength: 125,
          })}
        />
        <Textarea
          label="What negative consequences will there be if you don&#39;t do it?"
          placeholder="Not finish notes"
          {...register('not_finish_notes', {
            maxLength: 125,
          })}
        />
        <Input
          label="Unit of measurement*"
          placeholder="Unit of measurement"
          {...register('unit', { required: true, maxLength: 10 })}
          error={getFormError('unit of measurement', errors.unit?.type)}
        />
        <Button className={s.submit} type="submit">
          {isEdit ? 'edit' : 'create'}
        </Button>
      </form>
    </Modal>
  );
}
