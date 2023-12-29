import { Intro } from 'components';

import { Stack, rem } from '@mantine/core';

function HomePage() {
  return (
    <Stack gap={rem(72)}>
      <Intro />
    </Stack>
  );
}

export default HomePage;
