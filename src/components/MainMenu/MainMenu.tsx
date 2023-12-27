import { Anchor, Flex, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';

export default function MainMenu() {
  const { t } = useTranslation();

  const configMenu = [
    {
      key: 'Companies',
      href: ROUTES.companies,
    },
    {
      key: 'Jobs',
      href: ROUTES.jobs,
    },
    {
      key: 'Candidates',
      href: ROUTES.candidates,
    },
  ];

  return (
    <Flex gap={rem(36)}>
      {configMenu.map((item) => (
        <Anchor component={Link} key={item.key} to={item.href}>
          {item.key}
        </Anchor>
      ))}
    </Flex>
  );
}
