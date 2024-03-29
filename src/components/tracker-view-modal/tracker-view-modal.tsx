import { BsXLg } from 'react-icons/bs';

import type { Tracker } from 'components/tracker/tracker';
import { Button } from 'ui/button/button';
import { Modal } from 'ui/modal/modal';

import s from './tracker-view-modal.module.css';

type TrackerViewModalProps = {
  tracker: Tracker;
  onClose: () => void;
  isOpen: boolean;
};

export function TrackerViewModal({ isOpen, onClose, tracker }: TrackerViewModalProps) {
  return (
    <Modal
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
      isOpen={isOpen}
    >
      <div>
        <div className={s.field}>
          <span className={s.label}>name</span>
          <span className={s.value}>{tracker.name}</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>target value</span>
          <span className={s.value}>{tracker.target_value}</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>initial value</span>
          <span className={s.value}>{tracker.initial_value}</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>value</span>
          <span className={s.value}>{tracker.value}</span>
        </div>
        {tracker.reward && (
          <div className={s.field}>
            <span className={s.label}>reward</span>
            <span className={s.value}>{tracker.reward}</span>
          </div>
        )}
        <div className={s.field}>
          <span className={s.label}>unit</span>
          <span className={s.value}>{tracker.unit}</span>
        </div>
        {tracker.finish_notes && (
          <div className={s.field}>
            <span className={s.label}>finish notes</span>
            <span className={s.value}>{tracker.finish_notes}</span>
          </div>
        )}
        {tracker.not_finish_notes && (
          <div className={s.field}>
            <span className={s.label}>not finish notes</span>
            <span className={s.value}>{tracker.not_finish_notes}</span>
          </div>
        )}
        <Button className={s.closeButton} onClick={onClose} icon={<BsXLg />} />
      </div>
    </Modal>
  );
}
