import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  Loader,
  Title,
  rem,
  ActionIcon,
} from '@mantine/core';
import { IconSquareRoundedArrowLeft } from '@tabler/icons-react';
import { socket } from 'socket';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import InputEmoji from 'react-input-emoji';
import { API_SERVER, ROLES } from 'shared/constants';
// import { useSocketContext } from 'app/SocketProvider';
import { IMessage } from 'features/types';
import { ROUTES } from 'shared/routes';
import { formatDT } from 'shared/utils';
import { selectUser } from 'features/user';
import {
  selectActiveChat,
  selectActiveChatLoading,
  selectActiveChatError,
  resetActiveChat,
} from '../../chatsSlice';
import { sendMessage, getChat } from '../../services';
import classes from './Chat.module.scss';

function Chat() {
  const [text, setText] = useState('');
  const [typingStatus, setTypingStatus] = useState();

  const { t } = useTranslation();
  const navigation = useNavigate();

  const lastMessageRef = useRef(null);

  const dispatch = useAppDispatch();

  // const { socket } = useSocketContext();

  const user = useAppSelector(selectUser);
  const chat = useAppSelector(selectActiveChat);

  const recipientUser = chat.members.find((member) => member._id !== user?._id);

  let link = '';

  if (recipientUser?.role === ROLES.employer) {
    link = `${ROUTES.companies}/${recipientUser?._id}`;
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    link = `${ROUTES.resumes}/${recipientUser?.resume}`;
  }

  const closeChatHandler = () => {
    dispatch(resetActiveChat());
    navigation(ROUTES.chats);
  };

  const handleOnEnter = async (value: string) => {
    if (!value || !user?._id) return;

    try {
      const data = await dispatch(
        sendMessage({
          chatId: chat._id,
          senderId: user._id,
          content: value,
        }),
      ).unwrap();

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, chatId, content, senderId, createdAt } = data;

      socket.emit('message', {
        _id,
        chatId,
        content,
        senderId,
        createdAt,
        socketID: socket.id,
      });
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    async function onResponseMsg(msg: IMessage) {
      console.log('MSG', msg);
      // if (msg.senderId === user?._id) {
      //   sendMessage({
      //     chatId: msg.chatId,
      //     senderId: msg.senderId,
      //     content: msg.content,
      //   });
      // }
    }

    // function onTyping(data: boolean) {
    //   console.log('is Typing', data);
    //   setTypingStatus(data);
    // }

    socket.on('messageResponse', onResponseMsg);
    // socket.on('typingResponse', onTyping);

    return () => {
      socket.off('messageResponse', onResponseMsg);
      // socket.off('typingResponse', onTyping);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lastMessageRef.current as any)?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  const isOnline = Math.random() * 10 > 5;

  return (
    <Card className={classes.card}>
      <Flex direction='column' justify='space-between' h='100%' gap={rem(20)}>
        <Flex gap={rem(12)} className={classes.header}>
          <ActionIcon
            variant='transparent'
            aria-label='Close chat'
            size={38}
            onClick={closeChatHandler}
          >
            <IconSquareRoundedArrowLeft size={36} stroke={1.5} />
          </ActionIcon>

          <Flex align='center' gap={rem(12)}>
            <Anchor
              component={Link}
              to={link}
              size='sm'
              target='_blank'
              underline='never'
              className={classes.link}
            >
              <Group>
                <Avatar src={`${API_SERVER}/${recipientUser?.avatar}`} />
                <Text fw='bold'>
                  {recipientUser?.firstName} {recipientUser?.lastName}
                </Text>
              </Group>
            </Anchor>

            <Badge color={isOnline ? 'green' : 'red'} className={classes.badge}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </Flex>
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
                  <Text span>{formatDT(msg.createdAt, true)}</Text>
                </Stack>
              </Flex>
            ) : (
              <Flex key={msg._id} className={classes.messageLine}>
                <Stack
                  className={`${classes.message} ${classes.messageSender}`}
                >
                  <Text>{msg.content}</Text>
                  <Text span>{formatDT(msg.createdAt, true)}</Text>
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
          placeholder={t('type_a_message')}
        />
      </Flex>
    </Card>
  );
}

export default function ChatEnhancer() {
  const { chatId } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectActiveChatLoading);
  const error = useAppSelector(selectActiveChatError);
  const chat = useAppSelector(selectActiveChat);

  useEffect(() => {
    if (chatId) {
      dispatch(getChat(chatId));
    }
  }, [dispatch, chatId]);

  return loading ? (
    <Loader type='dots' m='20px auto' />
  ) : error ? (
    <Title order={3}>{error}</Title>
  ) : chat._id ? (
    <Chat />
  ) : (
    <Title order={3} ta='center' c='secondary'>
      {t('chat_not_selected')}
    </Title>
  );
}
