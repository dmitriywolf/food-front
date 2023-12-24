import { Intro, FeaturedJobs } from 'components';
import { TopCompanies } from 'features/companies';
import { Stack, rem } from '@mantine/core';

function HomePage() {
  return (
    <Stack gap={rem(72)}>
      <Intro />
      <TopCompanies />
      <FeaturedJobs />
    </Stack>
  );
}

export default HomePage;
