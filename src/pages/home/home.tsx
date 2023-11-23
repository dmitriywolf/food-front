import { useTranslation } from 'react-i18next';
import { DEBUG, SERVER_URL } from 'common/constants';

function MainPage() {
  const { t } = useTranslation();

  return (
    <div>
      {t('main_page')} {t('main_page')} {t('main_page')}
      <p>is debug {DEBUG}</p>
      <p>server {SERVER_URL}</p>
    </div>
  );
}

export default MainPage;
