import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack } from '@mantine/core';
import { getJobById, JobDetails } from 'features/jobs';
import { useAppDispatch } from 'store/hooks';

function JobPage() {
  const { jobid } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJobById(jobid!));
  }, [dispatch, jobid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <JobDetails />
        </Stack>
      </Container>
    </Box>
  );
}

export default JobPage;
