import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack } from '@mantine/core';
import { ResumeDetails, getResumeById } from 'features/resume';
import { useAppDispatch } from 'store/hooks';

function ResumePage() {
  const { resumeid } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (resumeid) {
      dispatch(getResumeById(resumeid));
    }
  }, [dispatch, resumeid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <ResumeDetails />
        </Stack>
      </Container>
    </Box>
  );
}

export default ResumePage;
