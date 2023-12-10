import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { AuthTemplate } from 'components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectIsLoading } from '../userSlice';
import { fetchForgotPassword } from '../service';

import ResetPasswordForm from './ResetPasswordForm';
import type { ResetPasswordFormValues } from './types';

export default function ResetPassword() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  // const submitHanlder = async (values: ResetPasswordFormValues) => {
  //   const { newPassword, confirmPassword } = values;

  //   try {
  //     await dispatch(fetchForgotPassword({ password: newPassword })).unwrap();
  //   } catch (error: unknown) {
  //     const { message } = error as Error;
  //     notifications.show({
  //       color: 'red',
  //       title: 'Forgot password error',
  //       message,
  //     });
  //   }
  // };

  return (
    <AuthTemplate title={t('reset_password')}>
      <Text>
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      {/* <ResetPasswordForm submit={submitHanlder} isSubmitting={isLoading} /> */}
    </AuthTemplate>
  );
}
