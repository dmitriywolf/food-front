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
import { NavLink } from 'react-router-dom';
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

  const navLinkClasse = ({ isActive }: { isActive: boolean }): string =>
    `${classes.link} ${isActive ? classes.active : ''}`;

  const menu = configMenu.map((item) => (
    <NavLink
      key={item.key}
      to={item.href}
      onClick={close}
      className={navLinkClasse}
    >
      <Flex className={classes.innerLink}>
        {item.icon}
        <Text>{item.key}</Text>
      </Flex>
    </NavLink>
  ));

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
        <Flex className={classes.menu}>{menu}</Flex>

        <Box className={classes.authWrap}>
          <AuthMenu />
        </Box>
      </Drawer>

      <Box className={classes.desktopMenu}>
        <Flex className={classes.menu}>{menu}</Flex>
      </Box>
    </>
  );
}
