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
  Button,
  Breadcrumbs,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import {
  IconBuilding,
  IconMailFilled,
  IconBrandLinkedin,
  IconPhone,
  IconCoin,
  IconMapPin,
  IconSquareCheckFilled,
  IconChartArrowsVertical,
  IconLanguage,
  IconChartInfographic,
  IconChartCandle,
  IconChartDonut4,
  IconChartAreaFilled,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { ROLES } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
import { selectCurrentJob } from '../../jobsSlice';
import { applyToJob } from '../../services';
import { ICompany } from '../../../types';

export default function JobDetailes() {
  const dispatch = useAppDispatch();

  const job = useAppSelector(selectCurrentJob);
  const user = useAppSelector(selectUser);

  const {
    author,
    category,
    city,
    companyType,
    country,
    domain,
    employmentOptions,
    englishLevel,
    experienceLevel,
    salaryRange,
    skills,
    summary,
    title,
    updatedAt,
    workExperience,
    viewsCount,
    applications,
  } = job;

  const {
    avatar,
    companyLogo,
    companyName,
    email,
    phone,
    userPosition,
    emailVerified,
    linkedin,
    firstName,
    lastName,
  } = author as ICompany;

  const applyJobHandler = async () => {
    if (user?._id) {
      try {
        await dispatch(applyToJob(job._id)).unwrap();
        notifications.show({
          color: 'green',
          title: 'Apply to job',
          message: 'You succeffull applied to this position',
        });
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: 'Apply to job',
          message: error as string,
        });
      }
    }
  };

  const iAlreadyApplied = applications.find((id) => id === user?._id);
  const showApplyBtn = !iAlreadyApplied && user?.role === ROLES.seeker;

  const items = [
    { title: 'Jobs', href: ROUTES.jobs },
    { title, href: '#' },
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
            <Stack gap={12}>
              <Flex align='center' justify='space-between'>
                <Title>{title}</Title>
                <Image src={companyLogo} w='100px' />
              </Flex>

              <Flex gap={10} align='center'>
                <IconCoin size={20} />
                <Text fw='bold'>{salaryRange} $</Text>
                {updatedAt && (
                  <Badge color='cyan'>Added: {formatDT(updatedAt)}</Badge>
                )}
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconBuilding size={20} />
                  <Text c='teal'>{companyName}</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconMapPin size={20} />
                  <Text>
                    {country}, {city}
                  </Text>
                </Flex>
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconChartInfographic size={20} />
                  <Text>{companyType}</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconChartCandle size={20} />
                  <Text>{domain}</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconChartDonut4 size={20} />
                  <Text>{category}</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconChartAreaFilled size={20} />
                  <Text>{employmentOptions}</Text>
                </Flex>
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconSquareCheckFilled size={20} />
                  <Text>Experience: {workExperience} years</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconChartArrowsVertical size={20} />
                  <Text>{experienceLevel}</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconLanguage size={20} />
                  <Text>English: {englishLevel}</Text>
                </Flex>
              </Flex>

              <Flex direction='column' gap={8}>
                <Text>Required skills:</Text>
                <Flex align='center' gap={12}>
                  {skills.split(', ').map((skill) => (
                    <Badge key={skill} color='cyan'>
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Flex>

              <Flex direction='column' gap={8}>
                <Text>Description: </Text>
                <Text>{summary}</Text>
              </Flex>

              <Flex align='center' justify='space-between' gap={24}>
                <Group>
                  <Text>Views: {viewsCount}</Text>
                  <Text>Applications: {applications.length}</Text>
                </Group>
                {iAlreadyApplied && (
                  <Badge color='green' fw='bold'>
                    You already applied
                  </Badge>
                )}
                {showApplyBtn && (
                  <Button onClick={applyJobHandler}>Apply</Button>
                )}
              </Flex>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={1}>
          {/* Потом вынести в отдельный компонент */}
          <Card shadow='sm' padding='md' radius='md' withBorder>
            <Card.Section>
              <Image src={avatar} w='100%' h={250} />
            </Card.Section>
            <Stack gap={12} pt={24}>
              <Group>
                <Title order={2}>
                  {firstName} {lastName}
                </Title>
                <Badge color={emailVerified ? 'teal' : 'pink'}>
                  {emailVerified ? 'Verified' : 'Unverified'}
                </Badge>
              </Group>
              <Text>{userPosition}</Text>
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
              </Group>

              <Group>
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
