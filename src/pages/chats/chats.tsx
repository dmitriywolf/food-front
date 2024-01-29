import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Grid, Box, Stack, Title, rem } from '@mantine/core';
import { socket } from 'socket';
import { Chat, Chats } from 'features/chats';

type OnlineUser = {
  userId: string;
  socketId: string;
};

function ChatsPage() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    function getUsers(users: OnlineUser[]) {
      setOnlineUsers(users.map((e) => e.userId));
    }

    socket.on('getUsers', getUsers);

    return () => {
      socket.off('getUsers', getUsers);
    };
  }, []);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          <Title>{t('chats')}</Title>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Chats onlineUsers={onlineUsers} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <Chat onlineUsers={onlineUsers} />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default ChatsPage;
