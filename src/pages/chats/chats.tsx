import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Stack } from '@mantine/core';
// import { getJobById, JobDetails } from 'features/jobs';
import { useAppDispatch } from 'store/hooks';
import { ChatList } from 'features/chats';

function ChatsPage() {
  const { chatid } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getJobById(jobid!));
  }, [dispatch, chatid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <Grid>
            <Grid.Col span={3}>
              <ChatList />
            </Grid.Col>
            <Grid.Col span={9}>Chat</Grid.Col>
          </Grid>
          {/* <JobDetails /> */}
        </Stack>
      </Container>
    </Box>
  );
}

export default ChatsPage;
