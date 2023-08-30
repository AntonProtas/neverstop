import {
  addDoc,
  doc,
  arrayUnion,
  collection,
  Timestamp,
  updateDoc,
  deleteDoc,
  arrayRemove,
} from 'firebase/firestore';

import db from './firesbase';
import { Tracker } from 'components/tracker/tracker';

export async function createWidgetRequest(dashboardId: string, widget: Tracker) {
  const createdWidget = await addDoc(collection(db, 'dashboards', dashboardId, 'widgets'), {
    ...widget,
    created: Timestamp.now(),
  });

  if (createdWidget) {
    await updateDoc(doc(db, 'dashboards', dashboardId), {
      widgets_order: arrayUnion(createdWidget.id),
    });
  }

  return createdWidget;
}

export async function updateWidgetRequest(dashboardId: string, widget: Tracker) {
  return await updateDoc(doc(db, 'dashboards', dashboardId, 'widgets', widget.id), {
    ...widget,
    updated: Timestamp.now(),
  });
}

export async function deleteWidgetRequest(dashboardId: string, widgetId: string) {
  await deleteDoc(doc(db, 'dashboards', dashboardId, 'widgets', widgetId));
  await updateDoc(doc(db, 'dashboards', dashboardId), {
    widgets_order: arrayRemove(widgetId),
  });
}

export function getWidgetsQuery(dashboardId: string) {
  return collection(db, 'dashboards', dashboardId, 'widgets');
}
