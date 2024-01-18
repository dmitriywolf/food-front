import { Anchor, Flex, Text } from '@mantine/core';
import { IconFileCv, IconListCheck, IconBuilding } from '@tabler/icons-react';

import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';
import classes from './MainMenu.module.scss';

export default function MainMenu() {
  const configMenu = [
    {
      key: 'Companies',
      href: ROUTES.companies,
      icon: <IconBuilding size={24} />,
    },
    {
      key: 'Jobs',
      href: ROUTES.jobs,
      icon: <IconListCheck size={24} />,
    },
    {
      key: 'Candidates',
      href: ROUTES.resumes,
      icon: <IconFileCv size={24} />,
    },
  ];

  return (
    <Flex className={classes.menu}>
      {configMenu.map((item) => (
        <Anchor
          component={Link}
          key={item.key}
          to={item.href}
          underline='never'
        >
          <Flex className={classes.link}>
            {item.icon}
            <Text>{item.key}</Text>
          </Flex>
        </Anchor>
      ))}
    </Flex>
  );
}
