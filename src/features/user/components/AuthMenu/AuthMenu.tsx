import { Button, Flex, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLogin2, IconUserPlus } from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectIsAuthorized } from '../../userSlice';

export default function AuthMenu() {
  const { t } = useTranslation();

  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (!isAuthorized) {
    return (
      <Flex align='center' justify='flex-end' gap={rem(16)}>
        <Link to={ROUTES.signin}>
          <Button variant='light' leftSection={<IconLogin2 size={16} />}>
            {t('signin')}
          </Button>
        </Link>
        <Link to={ROUTES.signup}>
          <Button variant='outline' leftSection={<IconUserPlus size={16} />}>
            {t('signup')}
          </Button>
        </Link>
      </Flex>
    );
  }

  return null;
}
