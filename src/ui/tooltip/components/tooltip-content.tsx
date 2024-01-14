import { forwardRef } from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';

import { useTooltipContext } from '../use-tooltip-context';

import s from '../tooltip.module.css';

export const TooltipContent = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  function TooltipContent({ style, className, ...props }, propRef) {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!context.open) return null;

    return (
      <FloatingPortal>
        <div
          className={cn(s.content, className)}
          ref={ref}
          style={{
            zIndex: 9999,
            ...context.floatingStyles,
            ...style,
          }}
          {...context.getFloatingProps(props)}
        />
      </FloatingPortal>
    );
  },
);
