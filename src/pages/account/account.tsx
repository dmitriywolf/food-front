import { useState, useEffect } from 'react';
import { Box, Tabs, Container, Stack, Title } from '@mantine/core';
import {
  IconFileCv,
  IconUserScan,
  IconBuilding,
  // IconReportAnalytics,
  IconListCheck,
} from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { ROLES } from 'shared/constants';
import { selectUser } from 'features/user/userSlice';
import {
  SeekerProfile,
  // EditEmployerProfile,
  AddEditVacancy,
  EmployerVacancies,
} from 'features/user';
import { Resume, getResume, selectResume } from 'features/resume';
import { ISeekerAccount } from 'features/types';

const SEEKER_TABS = {
  profile: 'profile',
  resume: 'resume',
  // applications: 'applications',
};

function SeekerTabs() {
  const [tab, setTab] = useState<string | null>(SEEKER_TABS.profile);
  const dispatch = useAppDispatch();

  const resume = useAppSelector(selectResume);
  const user = useAppSelector(selectUser) as unknown as ISeekerAccount;

  useEffect(() => {
    if (!resume._id) {
      dispatch(getResume(user?.resume));
    }
  }, [user?.resume, dispatch, resume]);

  return (
    <Tabs value={tab} onChange={setTab}>
      <Tabs.List mb={24}>
        <Tabs.Tab value={SEEKER_TABS.profile} leftSection={<IconUserScan />}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab value={SEEKER_TABS.resume} leftSection={<IconFileCv />}>
          Resume
        </Tabs.Tab>
        {/* <Tabs.Tab
          value={SEEKER_TABS.applications}
          leftSection={<IconReportAnalytics />}
        >
          My applications
        </Tabs.Tab> */}
      </Tabs.List>
      {
        {
          [SEEKER_TABS.profile]: <SeekerProfile />,
          [SEEKER_TABS.resume]: <Resume />,
          // [SEEKER_TABS.applications]: <p>Applications</p>,
        }[tab!]
      }
    </Tabs>
  );
}

const EMPLOYER_TABS = {
  profile: 'profile',
  vacancies: 'vacancies',
  addVacancy: 'addVacancy',
};

function EmployersTabs() {
  return (
    <Tabs defaultValue={EMPLOYER_TABS.profile}>
      <Tabs.List>
        <Tabs.Tab value={EMPLOYER_TABS.profile} leftSection={<IconUserScan />}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab
          value={EMPLOYER_TABS.vacancies}
          leftSection={<IconBuilding />}
        >
          My Vacancies
        </Tabs.Tab>
        <Tabs.Tab
          value={EMPLOYER_TABS.addVacancy}
          leftSection={<IconListCheck />}
        >
          Add vacancy
        </Tabs.Tab>
      </Tabs.List>
      {/* <Tabs.Panel value={EMPLOYER_TABS.profile}>
        <EditEmployerProfile />
      </Tabs.Panel> */}
      <Tabs.Panel value={EMPLOYER_TABS.vacancies}>
        <EmployerVacancies />
      </Tabs.Panel>
      <Tabs.Panel value={EMPLOYER_TABS.addVacancy}>
        <AddEditVacancy />
      </Tabs.Panel>
    </Tabs>
  );
}

function AccountPage() {
  const user = useAppSelector(selectUser);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={24} py={24}>
          <Title>My Account</Title>
          {user?.role === ROLES.seeker && <SeekerTabs />}
          {user?.role === ROLES.employer && <EmployersTabs />}
        </Stack>
      </Container>
    </Box>
  );
}

export default AccountPage;
