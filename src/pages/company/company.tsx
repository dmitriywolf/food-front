import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import { getCompanyById, CompanyDetails } from 'features/companies';

function CompanyPage() {
  const { companyid } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (companyid) {
      dispatch(getCompanyById(companyid));
    }
  }, [dispatch, companyid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={24} py={24}>
          <CompanyDetails />
        </Stack>
      </Container>
    </Box>
  );
}

export default CompanyPage;
