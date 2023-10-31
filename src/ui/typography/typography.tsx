import { memo, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import cn from 'classnames';

import typographyStyles from './typography.module.css';

import s from './typography.module.css';

export type TextSize = 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6';
export type TypographyProps = {
  children: ReactNode;
  className?: string;
  variant: TextSize;
  isShowingWholeText?: boolean;
  isOneLineText?: boolean;
  isTwoLineText?: boolean;
};

type TagVariants = 'h1' | 'h2' | 'h3' | 'span';

const defaultVariantMapping: Record<TextSize, { className: string; tag: TagVariants }> = {
  h1: { className: typographyStyles.h1, tag: 'h1' },
  h2: { className: typographyStyles.h2, tag: 'h2' },
  h3: { className: typographyStyles.h3, tag: 'h3' },
  p1: { className: typographyStyles.p1, tag: 'span' },
  p2: { className: typographyStyles.p2, tag: 'span' },
  p3: { className: typographyStyles.p3, tag: 'span' },
  p4: { className: typographyStyles.p4, tag: 'span' },
  p5: { className: typographyStyles.p5, tag: 'span' },
  p6: { className: typographyStyles.p6, tag: 'span' },
};

export const Typography = memo(function Typography({
  children,
  className = '',
  variant,
  isShowingWholeText = false,
  isOneLineText = false,
  isTwoLineText = false,
}: TypographyProps) {
  const ref = useRef<HTMLElement & HTMLHeadingElement>(null);
  const [title, setTitle] = useState<string>('');

  const Tag: TagVariants = defaultVariantMapping[variant].tag || 'span';

  useLayoutEffect(() => {
    if (ref.current) {
      const textTitle =
        !isShowingWholeText &&
        (ref.current.offsetWidth < ref.current.scrollWidth ||
          !ref.current.offsetWidth ||
          !ref.current.scrollWidth ||
          ref.current.offsetHeight < ref.current.scrollHeight ||
          !ref.current.offsetHeight ||
          !ref.current.scrollHeight)
          ? ref.current.innerText || children?.toString() || ''
          : '';

      if (title !== textTitle) {
        setTitle(textTitle);
      }
    }
  }, [children, isShowingWholeText, title]);

  return (
    <Tag
      className={cn(
        s.container,
        { [s.showWholeText]: isShowingWholeText },
        { [s.webkitBox]: isOneLineText || isTwoLineText },
        { [s.oneLine]: isOneLineText },
        { [s.twoLine]: isTwoLineText },
        defaultVariantMapping[variant].className,
        className,
      )}
      ref={ref}
      {...(title ? { title } : {})}
    >
      {children}
    </Tag>
  );
});
