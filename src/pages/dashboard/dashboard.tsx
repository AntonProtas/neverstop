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
//hooks
import { useDashboard } from 'hooks/use-dashboard';
import { useWidgets } from 'hooks/use-widgets';
//api
import { logOutRequest } from 'api/user';
import { createWidgetRequest, updateWidgetRequest, deleteWidgetRequest } from 'api/widget';
//helpers
import { parseError } from 'helpers/data-transform';
import { updateOrderRequest } from 'api/dashboard';
//constants
import { APPLICATION_URLS } from 'utils/constants';
//styles
import s from './dashboard.module.css';
import { toHash } from 'helpers/data-transform';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const {
    id: dashboardId,
    order,
    isLoading: isDashboardLoading,
  } = useDashboard({ userId: user?.uid });
  const { widgets, isLoading: isWidgetsLoading } = useWidgets({ dashboardId });

  const [trackerModal, setTrackerModal] = useState<{
    isOpen: boolean;
    tracker: Tracker | null;
  }>({
    isOpen: false,
    tracker: null,
  });

  const hashIdToWidget = useMemo(() => {
    return toHash(widgets, 'id');
  }, [widgets]);

  const openCreateModal = () =>
    setTrackerModal({
      isOpen: true,
      tracker: null,
    });
  const openEditModal = (tracker: Tracker) => {
    setTrackerModal({
      isOpen: true,
      tracker,
    });
  };

  const closeModal = () =>
    setTrackerModal({
      isOpen: false,
      tracker: null,
    });

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
    try {
      if (!dashboardId) {
        return;
      }

      await createWidgetRequest(dashboardId, data);

      closeModal();
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const updateWidget = async (data: Tracker) => {
    try {
      if (!dashboardId) {
        return;
      }

      await updateWidgetRequest(dashboardId, data);

      closeModal();
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const deleteWidget = async (id: string) => {
    try {
      if (!dashboardId) {
        return;
      }

      await deleteWidgetRequest(dashboardId, id);

      closeModal();
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

  return (
    <>
      <button className={s.logOut} onClick={onLogout}>
        log out
      </button>
      <button className={s.logOut} onClick={openCreateModal}>
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
                animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
                exit={{ x: 100, opacity: 0 }}
              >
                <Tracker
                  index={index}
                  tracker={hashIdToWidget[id]}
                  onDelete={deleteWidget}
                  onEdit={openEditModal}
                  onMove={moveTracker}
                />
              </motion.li>
            ))}
        </div>
      </AnimatePresence>
      <TrackerModal
        isOpen={trackerModal.isOpen}
        isEdit={!!trackerModal.tracker}
        tracker={trackerModal.tracker}
        onClose={closeModal}
        onSubmit={trackerModal.tracker ? updateWidget : createWidget}
      />
    </>
  );
}
