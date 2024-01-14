import { ReactNode } from 'react';
import { Placement, UseFloatingOptions } from '@floating-ui/react';

import { TooltipContext } from '../use-tooltip-context';

import { useTooltip } from '../use-tooltip';

export type FloatTooltipProps = {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  floatingProps?: Partial<UseFloatingOptions>;
};

export function FloatTooltip({
  children,
  floatingProps,
  ...options
}: { children: ReactNode } & FloatTooltipProps) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.

  const tooltip = useTooltip(options, floatingProps);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
