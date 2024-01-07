import { useEffect, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppSelector } from 'store/hooks';
import { selectIsAuthorized } from '../../userSlice';

type GuestGuardProps = {
  children: ReactElement;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  useEffect(() => {
    console.log('page mount');
    return () => {
      console.log('page unmount');
    };
  }, []);

  if (!isAuthorized) return <Navigate to={ROUTES.signin} />;

  return children;
}
