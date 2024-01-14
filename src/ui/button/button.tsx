import { ButtonHTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import cn from 'classnames';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

import { TextSize } from 'ui/typography/typography';
import typographyS from 'ui/typography/typography.module.css';

import s from './button.module.css';

export type ButtonProps = HTMLMotionProps<'button'> & {
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  textSize?: TextSize;
  variants?: Variants;
  tooltip?: string;
};

export function Button({
  className,
  children,
  icon,
  textSize = 'p4',
  variants,
  tooltip,
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
