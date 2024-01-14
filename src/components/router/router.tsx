import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from 'pages/dashboard/dashboard';
import { SignIn } from 'pages/sign-in/sign-in';
import { SignUp } from 'pages/sign-up/sign-up';
import { APPLICATION_URLS } from 'utils/constants';

import { PrivateRoute } from './private-route';
import { SmartRedirect } from './smart-redirect';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APPLICATION_URLS.signUp}
          element={
            <SmartRedirect>
              <SignUp />
            </SmartRedirect>
          }
        />
        <Route
          path={APPLICATION_URLS.signIn}
          element={
            <SmartRedirect>
              <SignIn />
            </SmartRedirect>
          }
        />
        <Route
          path={APPLICATION_URLS.dashboard}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<span>not found 404</span>} />
      </Routes>
    </BrowserRouter>
  );
}
