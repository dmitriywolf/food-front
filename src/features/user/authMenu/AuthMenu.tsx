import { Button, Flex, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLogin2, IconUserPlus, IconLogout } from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { removeItemLS } from 'utils';
import { selectIsAuthorized, logout } from '../userSlice';

export default function AuthMenu() {
  const { t } = useTranslation();

  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    removeItemLS(TOKEN_LOCALSTORAGE_KEY);
  };

  return (
    <Flex align='center' gap={rem(20)}>
      {isAuthorized ? (
        <Button
          variant='light'
          leftSection={<IconLogout size={14} />}
          onClick={logoutHandler}
        >
          logout
        </Button>
      ) : (
        <>
          <Link to={ROUTES.signin}>
            <Button variant='light' leftSection={<IconLogin2 size={14} />}>
              {t('signin')}
            </Button>
          </Link>
          <Link to={ROUTES.signup}>
            <Button variant='outline' leftSection={<IconUserPlus size={14} />}>
              {t('signup')}
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
}
