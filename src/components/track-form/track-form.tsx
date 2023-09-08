//libs
import { useForm } from 'react-hook-form';
//components
import type { Tracker } from 'components/tracker/tracker';
//styles
import s from './track-form.module.css';
import { getFormError } from 'helpers/forms';

type TrackFormProps = {
  tracker: Tracker;
  onClose: () => void;
  onSubmit: (data: TrackFormValues) => void;
};

export type TrackFormValues = {
  value: number;
};

export function TrackForm({ tracker, onClose, onSubmit }: TrackFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackFormValues>({
    mode: 'onBlur',
  });

  return (
    <div className={s.box}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          placeholder={`add ${tracker.unit}`}
          {...register('value', {
            valueAsNumber: true,
            required: true,
            max: tracker.target_value - tracker.value,
            min: 1,
          })}
        />
        {errors.value && (
          <span className={s.error}>{getFormError('current value', errors.value.type)}</span>
        )}
        <button type="submit">add up</button>
      </form>
      <button className={s.close} onClick={onClose}>
        close
      </button>
    </div>
  );
}
