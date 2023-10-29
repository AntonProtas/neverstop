//libs
import cn from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';
//types
import { TextSize } from 'ui/typography/typography';
//styles
import s from './button.module.css';
import typographyS from 'ui/typography/typography.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  textSize?: TextSize;
};

export function Button({ className, children, icon, textSize = 'p4', ...props }: ButtonProps) {
  return (
    <button
      className={cn(s.box, className, typographyS[textSize], {
        [s.iconBox]: !children,
      })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
