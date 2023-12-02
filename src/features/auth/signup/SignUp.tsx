import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import AuthTemplate from '../ui/AuthTemplate';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  const { t } = useTranslation();

  return (
    <AuthTemplate title={t('signup')}>
      <Text>
        {t('have_you_already_have_an_account')} ?{' '}
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      <SignUpForm />
    </AuthTemplate>
  );
}
