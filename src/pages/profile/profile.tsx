import { Box, Tabs, Container, Stack, Title } from '@mantine/core';
import {
  IconFileCv,
  IconUserScan,
  IconBuilding,
  IconReportAnalytics,
  IconListCheck,
} from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { ROLES } from 'shared/constants';
import { selectUser } from 'features/user/userSlice';
import { EditSeekerProfile, EditEmployerProfile } from 'features/user';

const SEEKER_TABS = {
  profile: 'profile',
  resume: 'resume',
  applications: 'applications',
};

function SeekerTabs() {
  return (
    <Tabs defaultValue={SEEKER_TABS.profile}>
      <Tabs.List>
        <Tabs.Tab value={SEEKER_TABS.profile} leftSection={<IconUserScan />}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab value={SEEKER_TABS.resume} leftSection={<IconFileCv />}>
          Resume
        </Tabs.Tab>
        <Tabs.Tab
          value={SEEKER_TABS.applications}
          leftSection={<IconReportAnalytics />}
        >
          My applications
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={SEEKER_TABS.profile}>
        <EditSeekerProfile />
      </Tabs.Panel>
      <Tabs.Panel value={SEEKER_TABS.resume}>My resume</Tabs.Panel>
      <Tabs.Panel value={SEEKER_TABS.applications}>Applications</Tabs.Panel>
    </Tabs>
  );
}

const EMPLOYER_TABS = {
  profile: 'profile',
  company: 'company',
  vacancies: 'vacancies',
};

function EmployersTabs() {
  return (
    <Tabs defaultValue={EMPLOYER_TABS.profile}>
      <Tabs.List>
        <Tabs.Tab value={EMPLOYER_TABS.profile} leftSection={<IconUserScan />}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab value={EMPLOYER_TABS.company} leftSection={<IconBuilding />}>
          Company
        </Tabs.Tab>
        <Tabs.Tab
          value={EMPLOYER_TABS.vacancies}
          leftSection={<IconListCheck />}
        >
          Vacancies
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={EMPLOYER_TABS.profile}>
        <EditEmployerProfile />
      </Tabs.Panel>
      <Tabs.Panel value={EMPLOYER_TABS.company}>Company</Tabs.Panel>
      <Tabs.Panel value={EMPLOYER_TABS.vacancies}>Vacancies</Tabs.Panel>
    </Tabs>
  );
}

function ProfilePage() {
  const user = useAppSelector(selectUser);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={32}>
          <Title>My Account</Title>
          {user?.role === ROLES.seeker && <SeekerTabs />}
          {user?.role === ROLES.employer && <EmployersTabs />}
        </Stack>
      </Container>
    </Box>
  );
}

export default ProfilePage;
