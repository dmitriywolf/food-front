import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { AuthTemplate } from 'components';
import { selectIsLoading } from '../userSlice';
import { fetchForgotPassword } from '../service';
import type { ForgotPasswordFormValues } from './types';

import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPassword() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const forgotPasswordHanlder = async (values: ForgotPasswordFormValues) => {
    const { email } = values;

    try {
      await dispatch(fetchForgotPassword({ email })).unwrap();
    } catch (error: unknown) {
      const { message } = error as Error;
      notifications.show({
        color: 'red',
        title: 'Forgot password error',
        message,
      });
    }
  };

  return (
    <AuthTemplate title={t('forgot_password')}>
      <Text>
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      <ForgotPasswordForm
        submit={forgotPasswordHanlder}
        isSubmitting={isLoading}
      />
    </AuthTemplate>
  );
}
