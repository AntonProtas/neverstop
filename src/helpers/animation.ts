import { Variants } from 'framer-motion';
import { getIsMobile } from 'helpers/common';

export function setAnimation(animation: Variants) {
  if (getIsMobile()) {
    return undefined;
  }

  return animation;
}

export const boxButtonsAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
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
