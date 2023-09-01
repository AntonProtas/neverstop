import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_MESSAGING_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();

export default db;
// export async function getUserDashboardCount(userId: string) {
//   const dashboardsRef = collection(db, "dashboards");
//   const q = query(dashboardsRef, where("user_id", "==", userId));
//   const { size } = await getDocs(q);
//   return size;
// }

// export async function updateDashboard(
//   dashboardId: string,
//   dashboard: {
//     trackers: Tracker[];
//     order: string[];
//   }
// ) {
//   console.log("dashboard", dashboard);

//   const dashboardRef = doc(db, "dashboards", dashboardId);
//   await updateDoc(dashboardRef, dashboard);
// }
