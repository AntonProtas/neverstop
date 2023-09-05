//libs
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
//components
import type { Tracker } from 'components/tracker/tracker';
import { Modal } from 'ui/modal/modal';
//helpers
import { getFormError } from 'helpers/forms';
//styles
import s from './tracker-modal.module.css';

type TrackerModalProps = {
  onSubmit: (tracker: Tracker) => void;
  onClose: () => void;
  isOpen: boolean;
  isEdit?: boolean;
  tracker: Tracker | null;
};

const DEFAULT_TRACKER = {
  name: 'test name',
  value: 30,
  initial_value: 25,
  target_value: 100,
  unit: 'days',
  finish_notes: 'finish notes test',
  not_finish_notes: 'not finish notes test',
  reward: 'test reward',
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
    defaultValues: { ...(tracker ? tracker : DEFAULT_TRACKER) },
  });

  useEffect(() => {
    if (tracker) {
      reset({ ...tracker });
    }
  }, [tracker, reset]);

  const targetValue = watch('target_value');
  const initialValue = watch('initial_value');

  return (
    <Modal
      className={s.box}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
      isOpen={isOpen}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register('name', { required: true })} />
        {errors.name && <span className={s.error}>This field is required</span>}
        <input
          type="number"
          placeholder="Target value"
          {...register('target_value', {
            valueAsNumber: true,
            required: true,
            min: 1,
          })}
        />
        {errors.target_value && (
          <span className={s.error}>{getFormError('target value', errors.target_value.type)}</span>
        )}
        <input
          type="number"
          placeholder="Initial value"
          {...register('initial_value', {
            valueAsNumber: true,
            required: true,
            max: targetValue,
            min: 0,
          })}
        />
        {errors.initial_value && (
          <span className={s.error}>
            {getFormError('initial value', errors.initial_value.type)}
          </span>
        )}
        <input
          type="number"
          placeholder="Current value"
          {...register('value', {
            valueAsNumber: true,
            required: true,
            max: targetValue,
            min: initialValue || 0,
          })}
        />
        {errors.value && (
          <span className={s.error}>{getFormError('current value', errors.value.type)}</span>
        )}
        <input placeholder="Reward" {...register('reward', { maxLength: 125 })} />
        <textarea
          placeholder="Finish notes"
          {...register('finish_notes', {
            maxLength: 125,
          })}
        />
        <textarea
          placeholder="Not finish notes"
          {...register('not_finish_notes', {
            maxLength: 125,
          })}
        />
        <input placeholder="Unit" {...register('unit', { required: true, maxLength: 125 })} />
        {errors.unit && (
          <span className={s.error}>
            <span className={s.error}>{getFormError('unit', errors.unit.type)}</span>
          </span>
        )}
        <button type="button" onClick={onClose}>
          close
        </button>
        <button type="submit">{isEdit ? 'edit' : 'create'}</button>
      </form>
    </Modal>
  );
}
