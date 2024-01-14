import { useMemo, useState } from 'react';
import {
  autoPlacement,
  autoUpdate,
  offset,
  shift,
  useDismiss,
  useFloating,
  UseFloatingOptions,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import { FloatTooltipProps } from './components/float-tooltip';

export function useTooltip(
  {
    initialOpen = false,
    placement,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
  }: FloatTooltipProps = {},
  floatingProps?: Partial<UseFloatingOptions>,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), ...(placement ? [] : [autoPlacement()]), shift({ padding: 8 })],
    ...floatingProps,
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}
