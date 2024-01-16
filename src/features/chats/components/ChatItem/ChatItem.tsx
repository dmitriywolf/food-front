import { Card, Flex, Avatar, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { selectUser } from 'features/user';
import { useAppSelector } from 'store/hooks';
import { API_SERVER } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { selectCurrentChat } from '../../chatsSlice';
import { IChat } from '../../../types';
import classes from './ChatItem.module.scss';

type ChatItemProps = {
  chat: IChat;
};

export default function ChatItem({ chat }: ChatItemProps) {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const activeChat = useAppSelector(selectCurrentChat);

  const receiveUser = chat.members.find((member) => member._id !== user?._id);

  const navigateToChat = () => {
    navigate(`${ROUTES.chats}/${chat._id}`);
  };

  // const msgs = 3;
  // const lastMessage = 'Hello its me';

  const isActive = activeChat._id === chat._id;

  return (
    <Card
      key={chat._id}
      shadow='sm'
      padding='xs'
      radius='sm'
      className={isActive ? classes.active : ''}
      onClick={navigateToChat}
    >
      <Flex gap={12}>
        <Avatar src={`${API_SERVER}/${receiveUser?.avatar}`} />

        <Flex direction='column' w='100%'>
          <Text>
            {receiveUser?.firstName} {receiveUser?.lastName}
          </Text>

          {/* <Text size='sm'>{lastMessage}</Text> */}
        </Flex>

        {/* <Flex direction='column' gap={2} align='flex-end'>
          <Text size='xs'>11:50</Text>
          <Badge size='sm' circle>
            {msgs}
          </Badge>
        </Flex> */}
      </Flex>
    </Card>
  );
}
