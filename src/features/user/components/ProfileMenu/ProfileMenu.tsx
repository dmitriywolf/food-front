import { Link } from 'react-router-dom';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';
import {
  IconFileCv,
  IconUserScan,
  IconEdit,
  IconListCheck,
  IconListTree,
  IconLogout,
  IconChevronRight,
  IconBuilding,
} from '@tabler/icons-react';
import { ROLES, API_SERVER } from 'shared/constants';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { ROUTES } from 'shared/routes';

import { selectIsAuthorized, selectUser, logout } from '../../userSlice';

const seekerConfig = [
  {
    title: 'My profile',
    href: ROUTES.profile,
    icon: <IconUserScan size={20} />,
  },
  {
    title: 'My resume',
    href: ROUTES.profileResume,
    icon: <IconFileCv size={20} />,
  },
  {
    title: 'My applications',
    href: ROUTES.profileApplications,
    icon: <IconListTree size={20} />,
  },
];

const employerConfig = [
  {
    title: 'My profile',
    href: ROUTES.profile,
    icon: <IconUserScan size={20} />,
  },
  {
    title: 'My company',
    href: ROUTES.profileCompany,
    icon: <IconBuilding size={20} />,
  },
  {
    title: 'My vacancies',
    href: ROUTES.profileVacancies,
    icon: <IconListCheck size={20} />,
  },
  {
    title: 'Create vacancy',
    href: ROUTES.profileAddEditVacancy,
    icon: <IconEdit size={20} />,
  },
];

export default function ProfileMenu() {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuConfig =
    user?.role === ROLES.seeker ? seekerConfig : employerConfig;

  if (isAuthorized) {
    return (
      <Menu withArrow trigger='click-hover'>
        <Menu.Target>
          <UnstyledButton>
            <Group gap={8}>
              <Avatar src={`${API_SERVER}/${user?.avatar}`} />
              <Text size='sm'>
                {user?.firstName} {user?.lastName}
              </Text>
              <IconChevronRight size='1rem' />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {menuConfig?.map(({ title, icon, href }) => (
            <Menu.Item
              key={title}
              leftSection={icon}
              component={Link}
              to={href}
            >
              {title}
            </Menu.Item>
          ))}

          <Menu.Item
            color='red'
            onClick={logoutHandler}
            leftSection={<IconLogout size={20} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }
  return null;
}
