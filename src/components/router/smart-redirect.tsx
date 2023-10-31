import { Navigate } from 'react-router-dom';
import { UserAuth } from 'context/auth';

import { APPLICATION_URLS } from 'utils/constants';
import { Loader } from 'ui/loader/loader';

export function SmartRedirect({ children }: { children: JSX.Element }) {
  const { user, isLoading } = UserAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={APPLICATION_URLS.dashboard} />;
  }

  return children;
}
