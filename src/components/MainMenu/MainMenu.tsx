import { Flex, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';

export default function MainMenu() {
  const { t } = useTranslation();

  const configMenu = [
    {
      key: t('find_job'),
      href: ROUTES.jobs,
    },
    {
      key: 'Find developer',
      href: ROUTES.jobs,
    },
    {
      key: t('statistics'),
      href: ROUTES.statistics,
    },
  ];

  return (
    <Flex gap={rem(36)}>
      {configMenu.map((item) => (
        <Link key={item.key} to={item.href}>
          {item.key}
        </Link>
      ))}
    </Flex>
  );
}
