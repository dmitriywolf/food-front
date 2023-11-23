import { useTranslation } from 'react-i18next';
import { SERVER_URL } from 'common/constants';

function MainPage() {
  const { t } = useTranslation();

  return (
    <div>
      {t('main_page')} {t('main_page')} {t('main_page')}
      <p>server {SERVER_URL}</p>
    </div>
  );
}

export default MainPage;
