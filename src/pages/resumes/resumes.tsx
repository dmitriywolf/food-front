import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';

import { getResumes, Resumes } from 'features/resume';
import { useAppDispatch } from 'store/hooks';

function ResumesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getResumes());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <Title>Candidates</Title>
          <Resumes />
        </Stack>
      </Container>
    </Box>
  );
}

export default ResumesPage;
