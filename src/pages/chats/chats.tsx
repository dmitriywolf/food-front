import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Stack } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import { ChatList, getChat, Chat } from 'features/chats';

function ChatsPage() {
  const { chatId } = useParams();

  const dispatch = useAppDispatch();

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
        <Grid.Col span={8}>
          <Chat />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ChatsPage;
