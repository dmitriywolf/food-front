import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBrandHipchat } from '@tabler/icons-react';
import classes from './ChatLink.module.scss';

export default function ChatLink() {
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
