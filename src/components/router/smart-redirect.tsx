import { Navigate } from 'react-router-dom';
import { UserAuth } from 'context/auth';

import { APPLICATION_URLS } from 'utils/constants';

export function SmartRedirect({ children }: { children: JSX.Element }) {
  const { user, isLoading } = UserAuth();

  if (isLoading || !user) {
    return <span>...loading user data</span>;
  }

  if (user) {
    return <Navigate to={APPLICATION_URLS.dashboard} />;
  }

  return children;
}
