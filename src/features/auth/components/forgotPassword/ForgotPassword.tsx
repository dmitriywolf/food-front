import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import AuthTemplate from '../AuthTemplate';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPassword() {
  const { t } = useTranslation();

  return (
    <AuthTemplate title={t('forgot_password')}>
      <Text>
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      <ForgotPasswordForm />
    </AuthTemplate>
  );
}
