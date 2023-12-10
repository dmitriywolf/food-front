import { useCallback, useEffect } from 'react';
import { Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { PageLoader } from 'components';
import { userVerifyEmail } from '../service';
import { selectIsLoading, selectError } from '../userSlice';

export default function VerifyEmail() {
  const { code = '' } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const verifyError = useAppSelector(selectError);

  const verifyHandler = useCallback(async () => {
    try {
      const data = await dispatch(userVerifyEmail({ code })).unwrap();

      notifications.show({
        color: 'green',
        title: 'Verify email',
        message: data.message,
      });
      navigate(ROUTES.signin);
    } catch (error: unknown) {
      console.log('Error', error);
    }
  }, [dispatch, navigate, code]);

  useEffect(() => {
    verifyHandler();
  }, [verifyHandler]);

  if (isLoading) return <PageLoader />;

  if (verifyError) return <Title>{verifyError}</Title>;

  return null;
}
