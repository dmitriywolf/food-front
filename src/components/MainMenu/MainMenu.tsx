import { Anchor, Flex, rem } from '@mantine/core';

import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';

export default function MainMenu() {
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
      href: ROUTES.resumes,
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
