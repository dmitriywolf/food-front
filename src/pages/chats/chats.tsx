import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ChatList, getChat, Chat, selectCurrentChat } from 'features/chats';

function ChatsPage() {
  const { chatId } = useParams();

  const dispatch = useAppDispatch();
  const chat = useAppSelector(selectCurrentChat);

  useEffect(() => {
    if (chatId) {
      dispatch(getChat(chatId));
    }
  }, [dispatch, chatId]);

  return (
    <Container size='responsive'>
      <Grid pt={24}>
        <Grid.Col span={4}>
          <ChatList />
        </Grid.Col>
        <Grid.Col span={8}>{chat._id && <Chat />}</Grid.Col>
      </Grid>
    </Container>
  );
}

export default ChatsPage;
