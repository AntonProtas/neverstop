//libs
import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
//context
import { UserAuth } from 'context/auth';
//components
import { Tracker } from 'components/tracker/tracker';
import { TrackerModal } from 'components/tracker-modal/tracker-modal';
import { ConfirmModal } from 'components/confirm-modal/confirm-modal';
import { TrackerViewModal } from 'components/tracker-view-modal/tracker-view-modal';
//hooks
import { useDashboard } from 'hooks/use-dashboard';
import { useWidgets } from 'hooks/use-widgets';
//api
import { logOutRequest } from 'api/user';
import {
  createWidgetRequest,
  updateWidgetRequest,
  deleteWidgetRequest,
  addTrackerProgressRequest,
} from 'api/widget';
//helpers
import { parseError } from 'helpers/data-transform';
import { updateOrderRequest } from 'api/dashboard';
//constants
import { APPLICATION_URLS } from 'utils/constants';
//styles
import s from './dashboard.module.css';
import { toHash } from 'helpers/data-transform';

type ModalsType = 'view' | 'create' | 'edit' | 'add-progress' | 'delete' | null;

type ModalState = {
  type: ModalsType;
  tracker?: Tracker;
  value?: number;
};

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const {
    id: dashboardId,
    order,
    isLoading: isDashboardLoading,
  } = useDashboard({ userId: user?.uid });
  const { widgets, isLoading: isWidgetsLoading } = useWidgets({ dashboardId });

  const [modal, setModal] = useState<ModalState>({
    type: null,
  });

  const hashIdToWidget = useMemo(() => {
    return toHash(widgets, 'id');
  }, [widgets]);

  const closeModal = () => {
    setModal({
      type: null,
    });
  };

  const moveTracker = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      try {
        if (!order || !dashboardId) {
          return;
        }

        const dragItem = order[dragIndex];
        const hoverItem = order[hoverIndex];
        const newOrder = [...order];

        newOrder[dragIndex] = hoverItem;
        newOrder[hoverIndex] = dragItem;

        await updateOrderRequest(dashboardId, [...newOrder]);
      } catch (error) {
        toast.error(parseError(error));
      }
    },
    [order, dashboardId],
  );

  const createWidget = async (data: Tracker) => {
    closeModal();

    try {
      if (!dashboardId) {
        return;
      }

      await createWidgetRequest(dashboardId, data);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const updateWidget = async (data: Tracker) => {
    closeModal();

    try {
      if (!dashboardId) {
        return;
      }

      await updateWidgetRequest(dashboardId, data);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const deleteWidget = async () => {
    closeModal();

    try {
      if (!dashboardId || !modal.tracker) {
        return;
      }

      await deleteWidgetRequest(dashboardId, modal.tracker.id);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const onLogout = async () => {
    try {
      await logOutRequest();

      navigate(APPLICATION_URLS.signIn);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const submitTrackerProgress = async (widgetId: string, value: number) => {
    try {
      if (!dashboardId) {
        return;
      }

      await addTrackerProgressRequest(dashboardId, widgetId, value);
      toast.success(`Now you got ${value}! Carry on!`);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  return (
    <>
      <button className={s.logOut} onClick={onLogout}>
        log out
      </button>
      <button className={s.logOut} onClick={() => setModal({ type: 'create' })}>
        add tracker
      </button>
      {(isDashboardLoading || isWidgetsLoading) && <span>...loading</span>}
      <AnimatePresence initial={false}>
        <div className={s.box}>
          {(order || [])
            .filter((id) => id in hashIdToWidget)
            .map((id, index) => (
              <motion.li
                key={id}
                layout
                transition={{ duration: 0.3 }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.1 } }}
                exit={{ x: 100, opacity: 0 }}
              >
                <Tracker
                  index={index}
                  tracker={hashIdToWidget[id]}
                  onDelete={(tracker) => setModal({ type: 'delete', tracker })}
                  onEdit={(tracker) =>
                    setModal({
                      type: 'edit',
                      tracker,
                    })
                  }
                  onTrackModeOpen={(tracker) =>
                    setModal({
                      type: 'add-progress',
                      tracker,
                    })
                  }
                  onView={(tracker) =>
                    setModal({
                      type: 'view',
                      tracker,
                    })
                  }
                  onMove={moveTracker}
                  onTrackModeClose={closeModal}
                  onTrackSubmit={submitTrackerProgress}
                  isTrackMode={id === modal.tracker?.id && modal.type === 'add-progress'}
                />
              </motion.li>
            ))}
        </div>
      </AnimatePresence>
      <TrackerModal
        isOpen={modal.type === 'create' || modal.type === 'edit'}
        isEdit={modal.type === 'edit'}
        tracker={modal.tracker}
        onClose={closeModal}
        onSubmit={modal.type === 'edit' ? updateWidget : createWidget}
      />
      {modal.tracker && (
        <TrackerViewModal
          isOpen={modal.type === 'view'}
          tracker={modal.tracker}
          onClose={closeModal}
        />
      )}
      <ConfirmModal
        text={`Do u really want to delete widget "${modal.tracker?.name}" ?`}
        isOpen={modal.type === 'delete'}
        onClose={closeModal}
        onSubmit={deleteWidget}
      />
    </>
  );
}
