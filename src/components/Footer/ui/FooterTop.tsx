import { Group, Title, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';

export default function FooterTop() {
  const { t } = useTranslation();

  return (
    <Group justify='space-between'>
      <Title order={2}>
        {t('are_you_interested_in_boosting_your_career')}?
      </Title>
      <Link to={ROUTES.signin}>
        <Button>{t('signup_to_community')}</Button>
      </Link>
    </Group>
  );
}
