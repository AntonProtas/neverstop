import { Variants } from 'framer-motion';

import { getIsMobile } from 'helpers/common';

export function setAnimation(animation: Variants) {
  if (getIsMobile()) {
    return undefined;
  }

  return animation;
}

export const boxButtonsAnimation: Variants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const buttonAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const formAnimation = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};
