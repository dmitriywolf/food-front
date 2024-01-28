import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectUnWatchedCount } from '../../notificationsSlice';
import { getMyNotifications } from '../../services';
import classes from './NotificationLink.module.scss';

export default function NotificationLink() {
  const dispatch = useAppDispatch();

  const count = useAppSelector(selectUnWatchedCount);

  useEffect(() => {
    dispatch(getMyNotifications());
  }, [dispatch]);

  return (
    <Link to={ROUTES.notifications} className={classes.iconLink}>
      <Indicator
        size={count ? 16 : 0}
        inline
        label={count > 0 ? count : undefined}
        color='red'
        offset={6}
      >
        <ActionIcon variant='transparent' size={32} aria-label='Notifications'>
          <IconBell size={28} />
        </ActionIcon>
      </Indicator>
    </Link>
  );
}
