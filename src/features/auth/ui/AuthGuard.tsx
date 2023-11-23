import { type ReactElement } from 'react';

type AuthGuardProps = {
  children: ReactElement;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  // const isAuthorized = useAppSelector(selectIsAuthorized);

  // if (isAuthorized) return <Navigate to='/' />;

  return children;
};
