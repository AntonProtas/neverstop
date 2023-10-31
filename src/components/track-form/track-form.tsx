//libs
import { useForm } from 'react-hook-form';
//components
import type { Tracker } from 'components/tracker/tracker';
//styles
import s from './track-form.module.css';
import { getFormError } from 'helpers/forms';
import { BsXLg } from 'react-icons/bs';
import { Input } from 'ui/input/input';
import { Button } from 'ui/button/button';

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
        <Input
          label="Number count to add"
          type="number"
          placeholder={`add ${tracker.unit}`}
          {...register('value', {
            valueAsNumber: true,
            required: true,
            max: tracker.target_value - tracker.value,
            min: 1,
          })}
          error={getFormError('current value', errors.value?.type)}
        />
        <Button className={s.addButton} type="submit">
          add up
        </Button>
      </form>
      <Button className={s.closeButton} onClick={onClose} icon={<BsXLg />} />
    </div>
  );
}
