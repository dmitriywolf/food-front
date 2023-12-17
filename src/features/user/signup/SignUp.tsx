import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { AuthTemplate } from 'components';
import { userRegister } from '../service';
import { selectIsLoading } from '../userSlice';

import SignUpForm from './SignUpForm';
import type { SignUpFormValues } from './types';

export default function SignUp() {
  const [successRegister, setSuccessRegister] = useState('');

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const signupHanlder = async (values: SignUpFormValues) => {
    const { firstName, lastName, email, password, role } = values;

    try {
      const data = await dispatch(
        userRegister({ firstName, lastName, email, password, role }),
      ).unwrap();

      setSuccessRegister(data.message);
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Sign up error',
        message: error as string,
      });
    }
  };

  return (
    <AuthTemplate title={t('signup')}>
      <Text>
        {t('have_you_already_have_an_account')} ?{' '}
        <Link to={ROUTES.signin}>{t('signin')}</Link>
      </Text>
      {successRegister ? (
        <Text>{successRegister}</Text>
      ) : (
        <SignUpForm submit={signupHanlder} isSubmitting={isLoading} />
      )}
    </AuthTemplate>
  );
}
