import { useEffect } from 'react';
import { Intro } from 'components';
import { TopCompanies } from 'features/companies';
import { TopJobs } from 'features/jobs';
import { Stack, rem } from '@mantine/core';
import { getTopCompanies } from 'features/companies/services';
import { getTopJobs } from 'features/jobs/services';
import { useAppDispatch } from 'store/hooks';

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopCompanies());
    dispatch(getTopJobs());
  }, [dispatch]);

  return (
    <Stack gap={rem(72)}>
      <Intro />
      {/* <TopCompanies />
      <TopJobs /> */}
    </Stack>
  );
}

export default HomePage;
