import { Box, Tabs, Container, Stack, Title, rem } from '@mantine/core';
import { IconFileCv, IconUserScan } from '@tabler/icons-react';
import { ProfileInfo } from 'features/user';

const TABS = {
  resume: 'resume',
  profile: 'profile',
};

function PrfilePage() {
  const iconStyle = { width: rem(24), height: rem(24) };

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          <Title>My Account</Title>

          <Tabs defaultValue={TABS.resume}>
            <Tabs.List>
              <Tabs.Tab
                value={TABS.resume}
                leftSection={<IconFileCv style={iconStyle} />}
              >
                Resume
              </Tabs.Tab>
              <Tabs.Tab
                value={TABS.profile}
                leftSection={<IconUserScan style={iconStyle} />}
              >
                Profile
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={TABS.resume}>Resume</Tabs.Panel>

            <Tabs.Panel value={TABS.profile}>
              <ProfileInfo />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}

export default PrfilePage;
