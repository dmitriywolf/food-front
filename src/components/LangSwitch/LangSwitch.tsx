import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';

export default function LangSwitch() {
  const { t, i18n } = useTranslation();

  const toggle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  return (
    <Button
      onClick={toggle}
      variant='transparent'
      rightSection={<IconWorld size={14} />}
      color='secondary'
    >
      {t('lang')}
    </Button>
  );
}
