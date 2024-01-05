import { Box, Tabs, Container, Stack, Title } from '@mantine/core';
import {
  IconFileCv,
  IconUserScan,
  IconEdit,
  IconListCheck,
  IconListTree,
  IconBuilding,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { ROLES } from 'shared/constants';
import { Applications } from 'features/jobs';
import {
  SeekerProfile,
  EmployerProfile,
  EmployerCompany,
  selectUser,
} from 'features/user';
import { Resume } from 'features/resume';
import { Vacancy, Vacancies } from 'features/employerVacancies';
import { ROUTES } from 'shared/routes';

const SEEKER_TABS = {
  profile: ROUTES.profile,
  resume: ROUTES.profileResume,
  applications: ROUTES.profileApplications,
};

function SeekerTabs() {
  const navigate = useNavigate();
  const { tab } = useParams();

  const navTab = `${ROUTES.account}/${tab}`;

  return (
    <>
      <Tabs value={navTab} onChange={(value) => navigate(value!)}>
        <Tabs.List>
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
      </Tabs>
      {
        {
          [SEEKER_TABS.profile]: <SeekerProfile />,
          [SEEKER_TABS.resume]: <Resume />,
          [SEEKER_TABS.applications]: <Applications />,
        }[navTab]
      }
    </>
  );
}

const EMPLOYER_TABS = {
  profile: ROUTES.profile,
  company: ROUTES.profileCompany,
  vacancies: ROUTES.profileVacancies,
  vacancy: ROUTES.profileAddEditVacancy,
};

function EmployersTabs() {
  const navigate = useNavigate();
  const { tab } = useParams();

  const navTab = `${ROUTES.account}/${tab}`;

  return (
    <>
      <Tabs value={navTab} onChange={(value) => navigate(value!)}>
        <Tabs.List>
          <Tabs.Tab
            value={EMPLOYER_TABS.profile}
            leftSection={<IconUserScan />}
          >
            Profile
          </Tabs.Tab>
          <Tabs.Tab
            value={EMPLOYER_TABS.company}
            leftSection={<IconBuilding />}
          >
            Company
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
      </Tabs>
      {
        {
          [EMPLOYER_TABS.profile]: <EmployerProfile />,
          [EMPLOYER_TABS.company]: <EmployerCompany />,
          [EMPLOYER_TABS.vacancies]: <Vacancies />,
          [EMPLOYER_TABS.vacancy]: <Vacancy />,
        }[navTab]
      }
    </>
  );
}

function AccountPage() {
  const user = useAppSelector(selectUser);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={24} py={24}>
          <Title>
            {user?.firstName} {user?.lastName}
          </Title>
          {user?.role === ROLES.seeker && <SeekerTabs />}
          {user?.role === ROLES.employer && <EmployersTabs />}
        </Stack>
      </Container>
    </Box>
  );
}

export default AccountPage;
