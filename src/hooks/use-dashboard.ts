import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { onSnapshot } from 'firebase/firestore';

import { getDashboardsQuery } from 'api/dashboard';

import { parseError } from 'helpers/data-transform';

export type DashboardState = {
  id: string;
  order: string[];
};

export function useDashboard({ userId }: { userId?: string }) {
  const [dashboardState, setDashboardState] = useState<DashboardState>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      getDashboardsQuery(userId),
      (querySnapshot) => {
        setLoading(false);
        querySnapshot.docs.map((doc) => {
          setDashboardState({
            id: doc.id,
            order: doc.data().widgets_order,
          });
        });
      },
      (error) => toast.error(parseError(error)),
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return {
    ...dashboardState,
    isLoading,
  };
}
