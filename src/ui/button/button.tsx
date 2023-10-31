//libs
import { Variants, motion, HTMLMotionProps } from 'framer-motion';
import cn from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';
//types
import { TextSize } from 'ui/typography/typography';
//styles
import s from './button.module.css';
import typographyS from 'ui/typography/typography.module.css';

export type ButtonProps = HTMLMotionProps<'button'> & {
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  textSize?: TextSize;
  variants?: Variants;
};

export function Button({
  className,
  children,
  icon,
  textSize = 'p4',
  variants,
  ...props
}: ButtonProps) {
  if (variants) {
    return (
      <motion.button
        className={cn(s.box, className, typographyS[textSize], {
          [s.iconBox]: !children,
        })}
        variants={variants}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {icon}
        {children}
      </motion.button>
    );
  }

  return (
    <button
      className={cn(s.box, className, typographyS[textSize], {
        [s.iconBox]: !children,
      })}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon}
      {children}
    </button>
  );
}
