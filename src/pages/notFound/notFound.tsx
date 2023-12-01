import { Center, Title, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';

function NotFoundPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Center py={rem(100)}>
      <Title order={2}>{t('not_found_page')}</Title>
    </Center>
  );
}

export default NotFoundPage;
