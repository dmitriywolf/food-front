import { type ReactElement } from 'react';

type GuestGuardProps = {
  children: ReactElement;
};

export const GuestGuard = ({ children }: GuestGuardProps) => {
  // const isAuthorized = useAppSelector(selectIsAuthorized);

  // if (!isAuthorized) return <Navigate to='/login' />;

  return children;
};
