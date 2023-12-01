import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';

export default function LangSwitch() {
  const { t, i18n } = useTranslation();

  const toggle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  return (
    <Button onClick={toggle} variant='transparent' color='secondary'>
      {t('lang')}
    </Button>
  );
}
