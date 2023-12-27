import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack } from '@mantine/core';
// import {
//   getCompanyById,
//   getCompanyJobsById,
// } from 'features/companies/services';
// import { useAppDispatch } from 'store/hooks';
// import { CompanyDetails } from 'features/companies';

function CompanyPage() {
  const { companyid } = useParams();

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getCompanyById(companyid!));
  //   dispatch(getCompanyJobsById(companyid!));
  // }, [dispatch, companyid]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          wedwe
          {/* <CompanyDetails /> */}
        </Stack>
      </Container>
    </Box>
  );
}

export default CompanyPage;
