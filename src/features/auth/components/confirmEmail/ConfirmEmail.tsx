import { Title, Button } from '@mantine/core';
import { ROUTES } from 'config/constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ConfirmEmail() {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('you_have_successfully_verified_your_mail')}</Title>
      <Link to={ROUTES.signin}>
        <Button>{t('signin')}</Button>
      </Link>
    </>
  );
}
