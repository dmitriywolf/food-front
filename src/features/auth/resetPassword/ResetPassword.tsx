import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import AuthTemplate from '../ui/AuthTemplate';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPassword() {
  const { t } = useTranslation();

  return (
    <AuthTemplate title={t('reset_password')}>
      <Text>
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      <ResetPasswordForm />
    </AuthTemplate>
  );
}
