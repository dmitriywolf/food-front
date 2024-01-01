import { useState, useEffect } from 'react';
import { Box, Tabs, Container, Stack, Title } from '@mantine/core';
import {
  IconFileCv,
  IconUserScan,
  IconEdit,
  IconListCheck,
  IconListTree,
} from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { ROLES } from 'shared/constants';
import { getMyApplications, MyApplications } from 'features/jobs';
import { SeekerProfile, EmployerProfile, selectUser } from 'features/user';
import { Resume, getResume, selectResume } from 'features/resume';
import { Vacancy, Vacancies, getVacancies } from 'features/employerVacancies';
import { ISeekerAccount } from 'features/types';

const SEEKER_TABS = {
  profile: 'profile',
  resume: 'resume',
  applications: 'applications',
};

function SeekerTabs() {
  const [tab, setTab] = useState<string | null>(SEEKER_TABS.profile);
  const dispatch = useAppDispatch();

  const resume = useAppSelector(selectResume);
  const user = useAppSelector(selectUser) as unknown as ISeekerAccount;

  useEffect(() => {
    if (!resume._id) {
      dispatch(getResume(user?.resume as string));
    }
  }, [user?.resume, dispatch, resume]);

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  return (
    <Tabs value={tab} onChange={setTab}>
      <Tabs.List mb={24}>
        <Tabs.Tab value={SEEKER_TABS.profile} leftSection={<IconUserScan />}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab value={SEEKER_TABS.resume} leftSection={<IconFileCv />}>
          Resume
        </Tabs.Tab>
        <Tabs.Tab
          value={SEEKER_TABS.applications}
          leftSection={<IconListTree />}
        >
          My applications
        </Tabs.Tab>
      </Tabs.List>
      {
        {
          [SEEKER_TABS.profile]: <SeekerProfile />,
          [SEEKER_TABS.resume]: <Resume />,
          [SEEKER_TABS.applications]: <MyApplications />,
        }[tab!]
      }
    </Tabs>
  );
}

const EMPLOYER_TABS = {
  profile: 'profile',
  vacancies: 'vacancies',
  vacancy: 'vacancy',
};

function EmployersTabs() {
  const [tab, setTab] = useState<string | null>(EMPLOYER_TABS.profile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  return (
    <Tabs value={tab} onChange={setTab}>
      <Tabs.List mb={24}>
        <Tabs.Tab value={EMPLOYER_TABS.profile} leftSection={<IconUserScan />}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab
          value={EMPLOYER_TABS.vacancies}
          leftSection={<IconListCheck />}
        >
          Vacancies
        </Tabs.Tab>
        <Tabs.Tab value={EMPLOYER_TABS.vacancy} leftSection={<IconEdit />}>
          Create/Edit Vacancy
        </Tabs.Tab>
      </Tabs.List>
      {
        {
          [EMPLOYER_TABS.profile]: <EmployerProfile />,
          [EMPLOYER_TABS.vacancies]: (
            <Vacancies setVacancyTab={() => setTab(EMPLOYER_TABS.vacancy)} />
          ),
          [EMPLOYER_TABS.vacancy]: <Vacancy />,
        }[tab!]
      }
    </Tabs>
  );
}

function AccountPage() {
  const user = useAppSelector(selectUser);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={24} py={24}>
          <Title>
            Account: {user?.firstName} {user?.lastName}
          </Title>
          {user?.role === ROLES.seeker && <SeekerTabs />}
          {user?.role === ROLES.employer && <EmployersTabs />}
        </Stack>
      </Container>
    </Box>
  );
}

export default AccountPage;
