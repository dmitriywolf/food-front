import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';

import { getCandidates, Candidates } from 'features/candidates';
import { useAppDispatch } from 'store/hooks';

function CandidatesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <Title>Candidates</Title>
          <Candidates />
        </Stack>
      </Container>
    </Box>
  );
}

export default CandidatesPage;
