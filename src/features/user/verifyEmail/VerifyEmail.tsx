import { useCallback, useEffect, useState } from 'react';
import { Title, Button } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { PageLoader } from 'components';
import { fetchVerifyEmail } from '../service';
import { selectIsLoading } from '../userSlice';

export default function VerifyEmail() {
  const [confirmResult, setConfirmResult] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { token = '' } = useParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const verifyAccountHandler = useCallback(async () => {
    try {
      const data = await dispatch(fetchVerifyEmail({ token })).unwrap();
      setIsSuccess(true);
      setConfirmResult(data.message);
    } catch (error: unknown) {
      const { message } = error as Error;
      setConfirmResult(message);
    }
  }, [dispatch, token]);

  useEffect(() => {
    verifyAccountHandler();
  }, [verifyAccountHandler]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <>
      <Title>{confirmResult}</Title>
      {isSuccess && (
        <Link to={ROUTES.signin}>
          <Button>{t('signin')}</Button>
        </Link>
      )}
    </>
  );
}
