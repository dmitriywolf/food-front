import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import { getJobs, Jobs } from 'features/jobs';

function JobsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={24} py={24}>
          <Title>Jobs</Title>
          <Jobs />
        </Stack>
      </Container>
    </Box>
  );
}

export default JobsPage;
