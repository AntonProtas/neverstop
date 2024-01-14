import { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

import s from './textarea.module.css';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: string;
  label?: string;
  rows?: number;
};

export const Textarea = forwardRef(function Input(
  { className, label, error, rows, ...props }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  return (
    <div className={cn(s.box, className)}>
      {label && <span className={s.label}>{label}</span>}
      <textarea className={s.input} ref={ref} rows={rows} {...props} />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
});
