import { Link } from 'react-router-dom';
import {
  Card,
  Text,
  Stack,
  Flex,
  Button,
  rem,
  Avatar,
  Anchor,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { useAppDispatch } from 'store/hooks';
import { NOTIFICATION_TYPES, API_SERVER } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { readNotification } from '../../services';
import { INotification } from '../../types';

import classes from './NotificationCard.module.scss';

type NotificationCardProps = {
  notification: INotification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, createdAt, data, isWatched, type } = notification;

  const dispatch = useAppDispatch();

  const watchHandler = async () => {
    try {
      const result = await dispatch(readNotification(_id)).unwrap();
      console.log(result.data);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  let title;
  let notify = null;

  switch (type) {
    case NOTIFICATION_TYPES.applyToJob:
      title = 'Application to your vacancy';
      notify = (
        <Flex gap={rem(4)} align='center'>
          <Avatar src={`${API_SERVER}/${data?.seeker.avatar}`} />{' '}
          <Anchor
            component={Link}
            to={`${ROUTES.resumes}/${data?.seeker?.id}`}
            target='_blank'
          >
            {data?.seeker?.name}
          </Anchor>
          <Text>applied to you vacancy</Text>
          <Anchor
            component={Link}
            to={`${ROUTES.jobs}/${data?.job?.id}`}
            target='_blank'
          >
            {data?.job?.title}
          </Anchor>
        </Flex>
      );
      break;
    default:
      title = 'Unknow notification';
  }

  return (
    <Card
      shadow='sm'
      radius={0}
      className={`${classes.card} ${!isWatched ? classes.unwatched : ''}`}
    >
      <Flex justify='space-between'>
        <Stack gap={rem(2)}>
          <Text fz={rem(12)} c='secondary'>
            {formatDT(createdAt, true)}
          </Text>
          <Text className={classes.title}>{title}</Text>
          {notify}
        </Stack>
        {!isWatched && (
          <Button
            variant='outline'
            size='xs'
            c='red'
            color='red'
            onClick={watchHandler}
          >
            Mark as watched
          </Button>
        )}
      </Flex>
    </Card>
  );
}
