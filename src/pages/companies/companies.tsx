import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { Companies, getCompanies } from 'features/companies';
import { useAppDispatch } from 'store/hooks';

function CompaniesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={24} py={24}>
          <Title>Companies</Title>
          <Companies />
        </Stack>
      </Container>
    </Box>
  );
}

export default CompaniesPage;
