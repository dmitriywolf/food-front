import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBrandHipchat } from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { socket } from 'socket';
import { selectUser } from 'features/user';
import classes from './ChatLink.module.scss';

export default function ChatLink() {
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit('addUser', currentUser._id);
    }
  }, [currentUser?._id]);

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
