import { Anchor, Flex, Text, Box, ActionIcon, Drawer } from '@mantine/core';
import {
  IconFileCv,
  IconListCheck,
  IconBuilding,
  IconChartDots,
  IconMenu2,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { AuthMenu } from 'features/user';

import { ROUTES } from 'shared/routes';
import { Link } from 'react-router-dom';
import classes from './MainMenu.module.scss';

export default function MainMenu() {
  const [opened, { open, close }] = useDisclosure(false);

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
    <>
      <ActionIcon
        className={classes.burger}
        variant='transparent'
        aria-label='Burger menu'
        size='xl'
        onClick={open}
      >
        <IconMenu2 style={{ width: '100%', height: '100%' }} stroke={1.5} />
      </ActionIcon>

      <Drawer opened={opened} onClose={close}>
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

        <Box className={classes.authWrap}>
          <AuthMenu />
        </Box>
      </Drawer>

      <Box className={classes.desktopMenu}>
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
      </Box>
    </>
  );
}
