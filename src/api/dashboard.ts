import { addDoc, collection, Timestamp, query, where } from 'firebase/firestore';

import db from './firesbase';

export type Dashboard = {
  id: string;
  user_id: string;
  widgets_order: string[];
};

export async function createInitialDashboardRequest(userId: string) {
  return await addDoc(collection(db, 'dashboards'), {
    user_id: userId,
    widgets_order: [],
    created: Timestamp.now(),
  });
}

export function getDashboardsQuery(userId: string) {
  return query(collection(db, 'dashboards'), where('user_id', '==', userId));
}
