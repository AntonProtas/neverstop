import { type ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';

import s from './modal.module.css';

type ModalProps = {
  className?: string;
  children?: ReactNode;
};

export type ReactModalProps = ModalProps & ReactModal.Props;

export function Modal({ isOpen, className, children, ...props }: ReactModalProps) {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen]);

  return (
    <ReactModal
      className={cn(s.box, className)}
      isOpen={isOpen}
      ariaHideApp={false}
      portalClassName={s.isSkipFocus}
      overlayClassName={s.overlay}
      {...props}
    >
      {children}
    </ReactModal>
  );
}
