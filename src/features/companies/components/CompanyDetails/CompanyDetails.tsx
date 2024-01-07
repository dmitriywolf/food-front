import {
  Title,
  Card,
  Text,
  Group,
  Badge,
  Grid,
  Stack,
  Flex,
  Anchor,
  Image,
  SimpleGrid,
  Breadcrumbs,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import {
  IconUserPlus,
  IconWorldWww,
  IconBuilding,
  IconUsers,
  IconMailFilled,
  IconBrandLinkedin,
  IconPhone,
  IconMapPin,
} from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import {
  API_SERVER,
  DEFAULT_COMPANY_AVATAR,
  DEFAULT_AVATAR,
} from 'shared/constants';
import { JobCard } from 'features/jobs';
import { selectCurrentCompany } from '../../companiesSlice';
import classes from './CompanyDetails.module.scss';

export default function CompanyDetails() {
  const { data, jobs } = useAppSelector(selectCurrentCompany);

  const {
    avatar,
    createdAt,
    firstName,
    lastName,
    linkedin,
    phone,
    userPosition,
    email,
    emailVerified,
    companyDescription,
    companyDouPage,
    companyEmployeesCount,
    companyHiresCount,
    companyLogo,
    companyName,
    companyWebSite,
    companyOffices,
  } = data;

  const items = [
    { title: 'Companies', href: ROUTES.companies },
    { title: companyName, href: '#' },
  ].map((item) => (
    <Anchor to={item.href} component={Link} key={item.title}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>

      <Grid columns={4}>
        <Grid.Col span={3}>
          <Card shadow='sm' padding='md' radius='md' withBorder>
            <Card.Section>
              <Image
                fallbackSrc={DEFAULT_COMPANY_AVATAR}
                src={`${API_SERVER}/${companyLogo}`}
                w='100%'
                h={250}
                radius='md'
              />
            </Card.Section>
            <Stack gap={24} pt={24}>
              <Title ta='center'>{companyName}</Title>

              <SimpleGrid cols={2} spacing={24}>
                <Stack gap={12}>
                  <Flex align='center' gap={8}>
                    <IconMapPin />
                    <Text>{companyOffices}</Text>
                  </Flex>
                  <Flex gap={8}>
                    <IconUsers />
                    <Text>{companyEmployeesCount} employers</Text>
                  </Flex>

                  {companyHiresCount && (
                    <Flex gap={8}>
                      <IconUserPlus />
                      <Text>Hires: {companyHiresCount}</Text>
                    </Flex>
                  )}

                  {createdAt && (
                    <Flex gap={8}>
                      <IconBuilding />
                      <Text>Added: {formatDT(createdAt)}</Text>
                    </Flex>
                  )}
                </Stack>

                <Stack gap={12}>
                  <Flex gap={8}>
                    <IconWorldWww />
                    <Anchor href={companyWebSite} c='teal'>
                      Company site
                    </Anchor>
                  </Flex>
                  <Flex gap={8}>
                    <IconWorldWww />
                    <Anchor href={companyDouPage} c='teal'>
                      Dou page
                    </Anchor>
                  </Flex>
                </Stack>
              </SimpleGrid>

              <Text>{companyDescription}</Text>
            </Stack>
          </Card>
          <Stack gap={12} pt={24}>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          {/* Потом вынести в отдельный компонент */}
          <Card shadow='sm' padding='md' radius='md' withBorder>
            <Card.Section className={classes.imgWrap}>
              <Image
                fallbackSrc={DEFAULT_AVATAR}
                src={`${API_SERVER}/${avatar}`}
                w='100%'
                h={250}
                radius='md'
              />
              <Badge
                className={classes.badge}
                color={emailVerified ? 'teal' : 'pink'}
              >
                {emailVerified ? 'Verified' : 'Unverified'}
              </Badge>
            </Card.Section>
            <Stack gap={12} pt={24}>
              <Group align='flex-end'>
                <Title order={2}>
                  {firstName} {lastName},
                </Title>
                <Text size='lg'>{userPosition}</Text>
              </Group>

              <Group>
                <Flex gap={8}>
                  <IconMailFilled />
                  <Anchor href={`mailto:${email}`} c='teal'>
                    Mail me
                  </Anchor>
                </Flex>

                {phone && (
                  <Flex gap={8}>
                    <IconPhone />
                    <Anchor href={`tel:${phone}`} c='teal'>
                      Call
                    </Anchor>
                  </Flex>
                )}

                {linkedin && (
                  <Flex gap={8}>
                    <IconBrandLinkedin />
                    <Anchor href={linkedin} c='teal'>
                      LinkedIn
                    </Anchor>
                  </Flex>
                )}
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
