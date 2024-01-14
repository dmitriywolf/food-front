import {
  Card,
  Flex,
  Avatar,
  Anchor,
  Indicator,
  Text,
  Badge,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { selectUser } from 'features/user';
import { useAppSelector } from 'store/hooks';
import { API_SERVER, ROLES } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { selectCurrentChat } from '../../chatsSlice';
import { IChat } from '../../../types';

type ChatItemProps = {
  chat: IChat;
};

export default function ChatItem({ chat }: ChatItemProps) {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const activeChat = useAppSelector(selectCurrentChat);

  const receiveUser = chat.members.find((member) => member._id !== user?._id);

  let link = '';

  if (receiveUser?.role === ROLES.employer) {
    link = `${ROUTES.companies}/${receiveUser?._id}`;
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    link = `${ROUTES.resumes}/${receiveUser?.resume}`;
  }

  const navigateToChat = () => {
    navigate(`${ROUTES.chats}/${chat._id}`);
  };

  const isOnline = Math.random() * 10 > 5;
  const msgs = 3;
  const lastMessage = 'Hello its me';

  const isActive = activeChat._id === chat._id;

  return (
    <Card
      key={chat._id}
      shadow='sm'
      padding='xs'
      radius='sm'
      withBorder={isActive}
      onClick={navigateToChat}
    >
      <Flex gap={12}>
        <Indicator
          inline
          size={10}
          offset={5}
          processing={isOnline}
          color={isOnline ? 'green' : 'red'}
        >
          <Avatar src={`${API_SERVER}/${receiveUser?.avatar}`} />
        </Indicator>

        <Flex direction='column' w='100%'>
          <Text>
            <Anchor component={Link} to={link} size='sm' target='_blank'>
              {receiveUser?.firstName} {receiveUser?.lastName}
            </Anchor>
          </Text>

          <Text c='gray' size='sm'>
            {lastMessage}
          </Text>
        </Flex>

        <Flex direction='column' gap={2} align='flex-end'>
          <Text c='gray' size='xs'>
            11:50
          </Text>
          <Badge size='sm' circle>
            {msgs}
          </Badge>
        </Flex>
      </Flex>
    </Card>
  );
}
