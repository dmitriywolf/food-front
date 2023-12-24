import { useEffect } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { CompaniesList } from 'features/companies';
import { getCompanies } from 'features/companies/services';
import { useAppDispatch } from 'store/hooks';

function CompaniesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          <Title>All companies</Title>
          <CompaniesList />
        </Stack>
      </Container>
    </Box>
  );
}

export default CompaniesPage;
