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
  tracker: Tracker;
  onEdit: (tracker: Tracker) => void;
  onDelete: (id: string) => void;
};

export function Tracker({ tracker, onEdit, onDelete }: TrackerProps) {
  const editClick = () => onEdit(tracker);
  const deleteClick = () => onDelete(tracker.id);

  return (
    <div className={s.box}>
      <div>
        <button onClick={deleteClick}>delete</button>
        <button onClick={editClick}>edit</button>
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
