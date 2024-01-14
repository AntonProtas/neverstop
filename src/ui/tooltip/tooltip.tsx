import { ReactNode } from 'react';
import { Placement, UseFloatingOptions } from '@floating-ui/react';

import { FloatTooltip } from './components/float-tooltip';
import { TooltipContent } from './components/tooltip-content';
import { TooltipTrigger } from './components/tooltip-trigger';

type TooltipProps = {
  children: ReactNode;
  content: string;
  placement?: Placement;
  floatingProps?: Partial<UseFloatingOptions>;
};

export function Tooltip({ children, content, placement, floatingProps }: TooltipProps) {
  return (
    <FloatTooltip placement={placement} floatingProps={floatingProps}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </FloatTooltip>
  );
}
