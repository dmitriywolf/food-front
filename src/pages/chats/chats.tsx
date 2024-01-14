import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Stack } from '@mantine/core';
// import { getJobById, JobDetails } from 'features/jobs';
import { useAppDispatch } from 'store/hooks';
import { useSocketContext } from 'app/SocketProvider';
import { ChatList, getChat } from 'features/chats';

function ChatsPage() {
  const { chatId } = useParams();

  const dispatch = useAppDispatch();

  const { socket } = useSocketContext();

  useEffect(() => {
    if (chatId) {
      dispatch(getChat(chatId));
    }
  }, [dispatch, chatId]);

  console.log('chat id', chatId, socket);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <Grid>
            <Grid.Col span={4}>
              <ChatList />
            </Grid.Col>
            <Grid.Col span={8}>Chat</Grid.Col>
          </Grid>
          {/* <JobDetails /> */}
        </Stack>
      </Container>
    </Box>
  );
}

export default ChatsPage;
