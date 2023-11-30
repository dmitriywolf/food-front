import { Button, Flex, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLogin2, IconUserPlus } from '@tabler/icons-react';

export default function AuthMenu() {
  const { t } = useTranslation();

  return (
    <Flex align='center' gap={rem(20)}>
      <Button variant='outline' leftSection={<IconUserPlus size={14} />}>
        {t('signup')}
      </Button>
      <Button variant='light' leftSection={<IconLogin2 size={14} />}>
        {t('signin')}
      </Button>
    </Flex>
  );
}
