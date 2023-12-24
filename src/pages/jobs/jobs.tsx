import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { JobsList } from 'features/jobs';
import { getJobs } from 'features/jobs/services';
import { useAppDispatch } from 'store/hooks';

function JobsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          <Title>All jobs</Title>
          <JobsList />
        </Stack>
      </Container>
    </Box>
  );
}

export default JobsPage;
