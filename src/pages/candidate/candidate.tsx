import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack } from '@mantine/core';
import { CandidateDetails } from 'features/candidates';
import { getCandidateById } from 'features/candidates/services';
import { useAppDispatch } from 'store/hooks';

function CandidatePage() {
  const { candidateid } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (candidateid) {
      dispatch(getCandidateById(candidateid));
    }
  }, [dispatch, candidateid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32} py={24}>
          <CandidateDetails />
        </Stack>
      </Container>
    </Box>
  );
}

export default CandidatePage;
