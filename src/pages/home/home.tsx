import { Intro, FeaturedCompanies, FeaturedJobs } from 'components';
import { Stack, rem } from '@mantine/core';

function HomePage() {
  return (
    <Stack gap={rem(72)}>
      <Intro />
      <FeaturedCompanies />
      <FeaturedJobs />
    </Stack>
  );
}

export default HomePage;
