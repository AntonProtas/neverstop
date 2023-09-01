//libs
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
//helpers
import { parseError } from 'helpers/data-transform';
//api
import { getWidgetsQuery } from 'api/widget';
//types
import type { Tracker } from 'components/tracker/tracker';

export function useWidgets({ dashboardId }: { dashboardId?: string }) {
  const [widgetsState, setWidgetsState] = useState<Tracker[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!dashboardId) {
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      getWidgetsQuery(dashboardId),
      (querySnapshot) => {
        setLoading(false);
        setWidgetsState(
          querySnapshot.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
              } as Tracker),
          ),
        );
      },
      (error) => toast.error(parseError(error)),
    );

    return () => {
      unsubscribe();
    };
  }, [dashboardId]);

  return {
    widgets: widgetsState,
    isLoading,
  };
}
