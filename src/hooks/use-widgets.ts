import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { onSnapshot } from 'firebase/firestore';

import { getWidgetsQuery } from 'api/widget';

import type { Tracker } from 'components/tracker/tracker';
import { parseError } from 'helpers/data-transform';

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
