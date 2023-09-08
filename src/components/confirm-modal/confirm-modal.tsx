//ui
import { Modal } from 'ui/modal/modal';

type ConfirmModalProps = {
  text: string;
  onClose: () => void;
  onSubmit: () => void;
  isOpen: boolean;
};

export function ConfirmModal({ isOpen, text, onClose, onSubmit }: ConfirmModalProps) {
  return (
    <Modal
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
      isOpen={isOpen}
    >
      <p
        style={{
          paddingBottom: 24,
        }}
      >
        {text}
      </p>
      <button onClick={onClose}>cancel</button>
      <button onClick={onSubmit}>confirm</button>
    </Modal>
  );
}
