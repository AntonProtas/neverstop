//ui
import { Button } from 'ui/button/button';
import { Modal } from 'ui/modal/modal';
import { Typography } from 'ui/typography/typography';
//styles
import s from './confirm-modal.module.css';

type ConfirmModalProps = {
  text: string;
  onClose: () => void;
  onSubmit: () => void;
  isOpen: boolean;
};

export function ConfirmModal({ isOpen, text, onClose, onSubmit }: ConfirmModalProps) {
  return (
    <Modal
      className={s.modal}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
      isOpen={isOpen}
    >
      <Typography variant="h3">{text}</Typography>
      <div className={s.controls}>
        <Button onClick={onClose}>cancel</Button>
        <Button onClick={onSubmit}>confirm</Button>
      </div>
    </Modal>
  );
}
