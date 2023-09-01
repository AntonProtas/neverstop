//libs
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
//constants
import { APPLICATION_URLS } from 'utils/constants';
//styles
import s from './dashboard.module.css';
import { toHash } from 'helpers/data-transform';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const { id: dashboardId, order } = useDashboard({ userId: user?.uid });
  const { widgets } = useWidgets({ dashboardId });

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
    } catch (e) {
      console.log(e);
    }
  };

  const updateWidget = async (data: Tracker) => {
    try {
      if (!dashboardId) {
        return;
      }

      await updateWidgetRequest(dashboardId, data);

      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteWidget = async (id: string) => {
    try {
      if (!dashboardId) {
        return;
      }

      await deleteWidgetRequest(dashboardId, id);

      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await logOutRequest();
      navigate(APPLICATION_URLS.signIn);
    } catch (e) {
      console.log(e);
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
