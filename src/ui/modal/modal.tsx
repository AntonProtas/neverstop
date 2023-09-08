//libs
import { useEffect, type ReactNode } from 'react';
import ReactModal from 'react-modal';
//styles
import s from './modal.module.css';

type ModalProps = {
  children?: ReactNode;
};

export type ReactModalProps = ModalProps & ReactModal.Props;

export function Modal({ isOpen, children, ...props }: ReactModalProps) {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen]);

  return (
    <ReactModal
      className={s.box}
      isOpen={isOpen}
      ariaHideApp={false}
      portalClassName={s.isSkipFocus}
      overlayClassName={s.overlay}
      {...props}
    >
      <div>{children}</div>
    </ReactModal>
  );
}
