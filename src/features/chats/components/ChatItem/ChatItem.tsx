import { Card, Flex, Avatar, Text, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { selectUser } from 'features/user';
import { useAppSelector } from 'store/hooks';
import { API_SERVER } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { selectActiveChat } from '../../chatsSlice';
import { IChat } from '../../../types';
import classes from './ChatItem.module.scss';

type ChatItemProps = {
  chat: IChat;
};

export default function ChatItem({ chat }: ChatItemProps) {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const activeChat = useAppSelector(selectActiveChat);

  const recipientUser = chat.members.find((member) => member._id !== user?._id);

  const navigateToChat = () => {
    navigate(`${ROUTES.chats}/${chat._id}`);
  };

  const isActive = activeChat._id === chat._id;

  return (
    <Card
      key={chat._id}
      className={`${classes.card} ${isActive ? classes.active : ''}`}
      onClick={navigateToChat}
      p='xs'
    >
      <Flex gap={rem(12)} align='center' className={classes.user}>
        <Avatar src={`${API_SERVER}/${recipientUser?.avatar}`} />
        <Text>
          {recipientUser?.firstName} {recipientUser?.lastName}
        </Text>
      </Flex>
    </Card>
  );
}
