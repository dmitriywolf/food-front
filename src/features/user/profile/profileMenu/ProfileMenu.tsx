import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { Group, Avatar, ActionIcon, Text, Anchor } from '@mantine/core';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { ROUTES } from 'shared/routes';

import { selectIsAuthorized, selectUser, logout } from '../../userSlice';

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
        <Anchor
          c='dimmed'
          component={Link}
          to={ROUTES.account}
          underline='never'
        >
          <Group>
            <Avatar src={user?.avatar} />
            <Text>
              {user?.firstName} {user?.lastName}
            </Text>
          </Group>
        </Anchor>
        <ActionIcon
          onClick={logoutHandler}
          variant='transparent'
          size='md'
          aria-label='Log out'
        >
          <IconLogout />
        </ActionIcon>
      </Group>
    );
  }
  return null;
}
