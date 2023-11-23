import { useTranslation } from 'react-i18next';
import { ActionIcon } from '@mantine/core';

export default function LangSwitch() {
  const { t, i18n } = useTranslation();

  const toggle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  return (
    <ActionIcon
      onClick={toggle}
      variant='default'
      size='xl'
      aria-label='Toggle language'
    >
      {t('lang')}
    </ActionIcon>
  );
}
