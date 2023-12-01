import { Center, Title, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export function StillWork() {
  const { t } = useTranslation();

  return (
    <Center py={rem(100)}>
      <Title order={2}>{t('this_page_is_still_under_construction')}</Title>
    </Center>
  );
}
