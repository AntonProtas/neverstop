import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from './firesbase';
import { createInitialDashboardRequest, getDashboardsCount } from './dashboard';

export async function createUserRequest(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  if (user.uid) {
    return await createInitialDashboardRequest(user.uid);
  }
}

export async function signInRequest(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogleRequest() {
  const user = await signInWithPopup(auth, googleProvider);
  const countsOfDashboard = await getDashboardsCount(user.user.uid);

  if (!countsOfDashboard) {
    return await createInitialDashboardRequest(user.user.uid);
  }
}

export async function logOutRequest() {
  return await signOut(auth);
}
