import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Text,
  Flex,
  Avatar,
  Stack,
  ScrollArea,
  Badge,
  Anchor,
  Group,
} from '@mantine/core';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import InputEmoji from 'react-input-emoji';
import { API_SERVER, ROLES } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { formatDT } from 'shared/utils';
import { selectUser } from 'features/user';
import { selectCurrentChat } from '../../chatsSlice';
import { sendMessage } from '../../services';
import classes from './Chat.module.scss';

export default function Chat() {
  const [text, setText] = useState('');

  const lastMessageRef = useRef(null);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const chat = useAppSelector(selectCurrentChat);

  const receiveUser = chat.members.find((member) => member._id !== user?._id);

  let link = '';

  if (receiveUser?.role === ROLES.employer) {
    link = `${ROUTES.companies}/${receiveUser?._id}`;
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    link = `${ROUTES.resumes}/${receiveUser?.resume}`;
  }

  const handleOnEnter = async (value: string) => {
    if (!value || !user?._id) return;

    try {
      await dispatch(
        sendMessage({
          chatId: chat._id,
          senderId: user._id,
          content: value,
        }),
      ).unwrap();
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lastMessageRef.current as any)?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  const isOnline = Math.random() * 10 > 5;

  return (
    <Card padding='md' radius='md' h='700px' withBorder>
      <Flex direction='column' justify='space-between' h='100%' gap={20}>
        <Flex
          justify='center'
          align='center'
          gap={12}
          className={classes.header}
        >
          <Anchor component={Link} to={link} size='sm' target='_blank'>
            <Group>
              <Avatar src={`${API_SERVER}/${receiveUser?.avatar}`} />
              <Text fw='bold' c='gray'>
                {receiveUser?.firstName} {receiveUser?.lastName}
              </Text>
            </Group>
          </Anchor>

          <Badge color={isOnline ? 'green' : 'red'}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </Flex>

        <ScrollArea
          flex='1'
          type='auto'
          offsetScrollbars
          scrollHideDelay={2000}
          className={classes.chat}
        >
          {chat.messages.map((msg) =>
            msg.senderId !== user?._id ? (
              <Flex key={msg._id} className={classes.messageLine}>
                <Stack
                  className={`${classes.message} ${classes.messageRecepient}`}
                >
                  <Text>{msg.content}</Text>
                  <Text span>{formatDT(msg.createdAt)}</Text>
                </Stack>
              </Flex>
            ) : (
              <Flex key={msg._id} className={classes.messageLine}>
                <Stack
                  className={`${classes.message} ${classes.messageSender}`}
                >
                  <Text>{msg.content}</Text>
                  <Text span>{formatDT(msg.createdAt)}</Text>
                </Stack>
              </Flex>
            ),
          )}
          <div ref={lastMessageRef} />
        </ScrollArea>

        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder='Type a message'
        />
      </Flex>
    </Card>
  );
}
