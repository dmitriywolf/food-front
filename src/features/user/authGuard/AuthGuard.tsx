import { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppSelector } from 'store/hooks';
import { selectIsAuthorized } from '../userSlice';

type AuthGuardProps = {
  children: ReactElement;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) return <Navigate to={ROUTES.my} />;

  return children;
}
