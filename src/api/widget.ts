import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

import { Tracker } from 'components/tracker/tracker';

import db from './firesbase';

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

export async function addTrackerProgressRequest(
  dashboardId: string,
  widgetId: string,
  value: number,
) {
  return await updateDoc(doc(db, 'dashboards', dashboardId, 'widgets', widgetId), {
    value,
    updated: Timestamp.now(),
    update_points: arrayUnion({
      date: Timestamp.now(),
      value,
    }),
  });
}
