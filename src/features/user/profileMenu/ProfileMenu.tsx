import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { Group, Avatar, ActionIcon, Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { ROUTES } from 'shared/routes';

import { selectIsAuthorized, selectUser, logout } from '../userSlice';

export default function ProfileMenu() {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (isAuthorized) {
    return (
      <Group>
        <Link to={ROUTES.my}>
          <Group>
            <Avatar src={user?.image} />
            <Text>
              {user?.firstName} {user?.lastName}
            </Text>
          </Group>
        </Link>
        <ActionIcon onClick={logoutHandler} size='lg' aria-label='Log out'>
          <IconLogout />
        </ActionIcon>
      </Group>
    );
  }
  return null;
}
