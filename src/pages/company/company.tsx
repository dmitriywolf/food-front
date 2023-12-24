import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack, Title } from '@mantine/core';
import { getCompanyById } from 'features/companies/services';
import { useAppDispatch } from 'store/hooks';
import { CompanyInfo } from 'features/companies/components/CompanyInfo';

function CompanyPage() {
  const { companyid } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanyById(companyid!));
  }, [dispatch, companyid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          <Title>Company page</Title>
          <CompanyInfo />
        </Stack>
      </Container>
    </Box>
  );
}

export default CompanyPage;
