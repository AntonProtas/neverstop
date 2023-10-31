//libs
import cn from 'classnames';
import { InputHTMLAttributes, Ref, forwardRef } from 'react';
//styles
import s from './input.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: string;
  label?: string;
};

export const Input = forwardRef(function Input(
  { className, label, error, ...props }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={cn(s.box, className)}>
      {label && <span className={s.label}>{label}</span>}
      <input className={s.input} ref={ref} {...props} />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
});
