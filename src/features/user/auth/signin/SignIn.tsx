import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { AuthTemplate } from 'components';
import { userLogin } from '../../service';
import { selectIsLoading } from '../../userSlice';

import SignInForm from './SignInForm';
import type { SignInFormValues } from './types';

export default function SignIn() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const signupHanlder = async (values: SignInFormValues) => {
    const { email, password } = values;

    try {
      await dispatch(userLogin({ email, password })).unwrap();
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Sign in error',
        message: error as string,
      });
    }
  };

  return (
    <AuthTemplate title={t('signin')}>
      <Text>
        {t('do_not_have_an_account')} ?{' '}
        <Link to={ROUTES.signup}>{t('signup')}</Link>
      </Text>
      <SignInForm submit={signupHanlder} isSubmitting={isLoading} />
    </AuthTemplate>
  );
}
