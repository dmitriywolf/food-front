import { Anchor, Flex, Text } from '@mantine/core';
import {
  IconFileCv,
  IconListCheck,
  IconBuilding,
  IconChartDots,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';
import classes from './MainMenu.module.scss';

export default function MainMenu() {
  const { t } = useTranslation();

  const configMenu = [
    {
      key: t('companies'),
      href: ROUTES.companies,
      icon: <IconBuilding size={20} />,
    },
    {
      key: t('jobs'),
      href: ROUTES.jobs,
      icon: <IconListCheck size={20} />,
    },
    {
      key: t('candidates'),
      href: ROUTES.resumes,
      icon: <IconFileCv size={20} />,
    },
    {
      key: t('statistics'),
      href: ROUTES.statistics,
      icon: <IconChartDots size={20} />,
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
