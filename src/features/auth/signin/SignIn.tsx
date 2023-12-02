import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import AuthTemplate from '../ui/AuthTemplate';
import SignInForm from './SignInForm';

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <AuthTemplate title={t('signin')}>
      <Text>
        {t('do_not_have_an_account')} ?{' '}
        <Link to={ROUTES.signup}>{t('signup')}</Link>
      </Text>
      <SignInForm />
    </AuthTemplate>
  );
}
