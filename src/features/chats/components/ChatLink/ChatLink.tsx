import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBrandHipchat } from '@tabler/icons-react';
import { selectUser } from 'features/user';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { socket } from 'socket';
import { setOnlineUsers } from '../../chatsSlice';
import classes from './ChatLink.module.scss';

type OnlineUser = {
  userId: string;
  socketId: string;
};

export default function ChatLink() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit('addUser', currentUser._id);
    }
  }, [currentUser?._id]);

  useEffect(() => {
    function getUsers(users: OnlineUser[]) {
      dispatch(setOnlineUsers(users.map((e) => e.userId)));
    }

    socket.on('getUsers', getUsers);

    return () => {
      socket.off('getUsers', getUsers);
    };
  }, [dispatch]);

  return (
    <Link to={ROUTES.chats} className={classes.iconLink}>
      <Indicator size={12} color='transparent' offset={6}>
        <ActionIcon variant='transparent' size={32} aria-label='Chats'>
          <IconBrandHipchat size={28} />
        </ActionIcon>
      </Indicator>
    </Link>
  );
}
