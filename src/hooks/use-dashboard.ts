//libs
import { useEffect, useState } from 'react';
//libs
import { onSnapshot } from 'firebase/firestore';
//api
import { getDashboardsQuery } from 'api/dashboard';

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
      (error) => console.log(error),
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
