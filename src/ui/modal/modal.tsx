import { useEffect, type ReactNode } from 'react';
import ReactModal from 'react-modal';

import './modal.css';

type ModalProps = {
  preventBodyScroll?: boolean;
  removeFocusBorder?: boolean;
  transparentOverlay?: boolean;
  children?: ReactNode;
};

export type ReactModalProps = ModalProps & ReactModal.Props;

export function Modal({
  isOpen,
  preventBodyScroll = true,
  removeFocusBorder = true,
  transparentOverlay = false,
  children,
  ...props
}: ReactModalProps) {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpen && preventBodyScroll ? 'hidden' : 'auto';
    }
  }, [isOpen, preventBodyScroll]);
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      portalClassName={removeFocusBorder ? 'modal is-skip-focus' : 'modal'}
      overlayClassName={transparentOverlay ? 'modal-overlay is-transparent' : 'modal-overlay'}
      {...props}
    >
      {children}
    </ReactModal>
  );
}
