import cn from 'classnames';

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

  const spaceForPercentages = percentages < 10 ? 4 : -24;

  return (
    <div className={cn(s.box, className)}>
      <div className={s.value}>
        <span>{value}</span>
        {unit && <span> {unit}</span>}
      </div>
      <div className={s.progressBox}>
        {percentages !== 0 && (
          <>
            <span
              style={{
                left: `calc(${percentages}% + ${spaceForPercentages}px)`,
                transform: 'translate(-50%, 0)',
              }}
              className={s.percentages}
            >
              <span></span>
              {percentages}%
            </span>
            <div
              style={{
                width: `${percentages}%`,
              }}
              className={s.progress}
            ></div>
          </>
        )}
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
