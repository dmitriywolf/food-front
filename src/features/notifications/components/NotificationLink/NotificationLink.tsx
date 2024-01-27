import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { selectUnWatchedCount } from '../../notificationsSlice';
import classes from './NotificationLink.module.scss';

export default function NotificationLink() {
  const count = useAppSelector(selectUnWatchedCount);

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
