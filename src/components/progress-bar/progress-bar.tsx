//libs
import cn from 'classnames';
//styles
import s from './progress-bar.module.css';

type ProgressBarProps = {
  value: number;
  className?: string;
  start?: number;
  end: number;
  unit?: string;
};

export function ProgressBar({ value, className, start, end, unit }: ProgressBarProps) {
  const percentages = Math.floor((value / end) * 100);

  return (
    <div className={cn(s.box, className)}>
      <div className={s.progressBox}>
        <span
          style={{
            left: percentages >= 90 ? `50%` : `${percentages + 2}%`,
          }}
          className={s.percentages}
        >
          {percentages}%
        </span>
        <span
          className={s.value}
          style={{
            left: percentages >= 90 ? `50%` : `${percentages + 2}%`,
          }}
        >
          {value}
          {unit && <span> {unit}</span>}
        </span>
        <div
          style={{
            width: `${percentages}%`,
          }}
          className={s.progress}
        ></div>
      </div>
      <div className={s.axisNumbers}>
        {start !== undefined && (
          <span className={s.start}>
            {start} {unit && <span> {unit}</span>}
          </span>
        )}
        {end !== undefined && (
          <span className={s.end}>
            {end} {unit && <span> {unit}</span>}
          </span>
        )}
      </div>
    </div>
  );
}
