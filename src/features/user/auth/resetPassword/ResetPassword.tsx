import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { ROUTES } from 'shared/routes';
import { AuthTemplate } from 'components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectIsLoading } from '../../userSlice';
import { userResetPassword } from '../../service';

import ResetPasswordForm from './ResetPasswordForm';
import type { ResetPasswordFormValues } from './types';

export default function ResetPassword() {
  const { t } = useTranslation();
  const { code = '' } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const submitHanlder = async (values: ResetPasswordFormValues) => {
    if (!code) return;
    const { newPassword } = values;

    try {
      const data = await dispatch(
        userResetPassword({ code, password: newPassword }),
      ).unwrap();
      notifications.show({
        color: 'green',
        title: 'ResetPassword',
        message: data.message,
      });
      navigate(ROUTES.signin);
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Forgot password',
        message: error as string,
      });
    }
  };

  return (
    <AuthTemplate title={t('reset_password')}>
      <Text>
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      <ResetPasswordForm submit={submitHanlder} isSubmitting={isLoading} />
    </AuthTemplate>
  );
}
