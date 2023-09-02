//libs
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      <div className={s.box}>
        {(order || [])
          .filter((id) => id in hashIdToWidget)
          .map((id) => (
            <Tracker
              key={id}
              tracker={hashIdToWidget[id]}
              onDelete={deleteWidget}
              onEdit={openEditModal}
            />
          ))}
      </div>
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
