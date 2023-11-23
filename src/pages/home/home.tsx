import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation();

  return (
    <div>
      {t('main_page')} {t('main_page')} {t('main_page')}
      {t('main_page')}
    </div>
  );
}

export default MainPage;
