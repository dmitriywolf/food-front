import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';

import { CandidatesList } from 'features/candidates';
import { getCandidates } from 'features/candidates/services';
import { useAppDispatch } from 'store/hooks';

function CandidatesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          <Title>All candadates</Title>
          <CandidatesList />
        </Stack>
      </Container>
    </Box>
  );
}

export default CandidatesPage;
