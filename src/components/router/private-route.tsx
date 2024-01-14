import { Navigate } from 'react-router-dom';

import { UserAuth } from 'context/auth';

import { APPLICATION_URLS } from 'utils/constants';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to={APPLICATION_URLS.signIn} />;
  }

  return children;
}
