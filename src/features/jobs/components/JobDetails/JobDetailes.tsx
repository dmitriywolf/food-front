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
  IconChartBar,
  IconLanguage,
  IconChartInfographic,
  IconChartCandle,
  IconChartDonut4,
  IconChartAreaFilled,
  IconUsersGroup,
  IconMapPins,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import {
  ROLES,
  API_SERVER,
  DEFAULT_COMPANY_AVATAR,
  DEFAULT_AVATAR,
} from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
import { MakeChatButton } from 'features/chats';
import { selectCurrentJob } from '../../jobsSlice';
import { applyToJob } from '../../services';
import { ICompany } from '../../../types';
import classes from './JobDetails.module.scss';

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
    employment,
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
    isArchive,
  } = job;

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    companyLogo,
    companyName,
    email,
    role,
    phone,
    userPosition,
    emailVerified,
    linkedin,
    firstName,
    lastName,
    companyEmployeesCount,
    companyOffices,
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
            <Flex gap={24} justify='space-between' align='flex-start'>
              <Stack gap={12} w='100%'>
                <Flex align='flex-start' justify='space-between'>
                  <Title>{title}</Title>

                  <Flex gap={8} justify='flex-end'>
                    {updatedAt && (
                      <Badge color='grey'>{formatDT(updatedAt)}</Badge>
                    )}
                    {isArchive && <Badge color='red'>Arhived</Badge>}

                    {iAlreadyApplied && (
                      <Badge color='green' fw='bold'>
                        You applied
                      </Badge>
                    )}
                  </Flex>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconCoin size={20} />
                  <Text fw='bold'>{salaryRange} $</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconMapPin size={20} />
                  <Text>
                    {country}, {city}
                  </Text>
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
                </Flex>

                <Flex gap={10} align='center'>
                  <IconChartAreaFilled size={20} />

                  {employment.map((e) => (
                    <Text key={e}>{e}</Text>
                  ))}
                </Flex>

                <Flex align='center' gap={24}>
                  <Flex gap={10} align='center'>
                    <IconSquareCheckFilled size={20} />
                    <Text>Experience: {workExperience} years</Text>
                  </Flex>

                  <Flex gap={10} align='center'>
                    <IconChartBar size={20} />
                    <Text>{experienceLevel}</Text>
                  </Flex>

                  <Flex gap={10} align='center'>
                    <IconLanguage size={20} />
                    <Text>English: {englishLevel}</Text>
                  </Flex>
                </Flex>

                <Flex direction='column' gap={8}>
                  <Text>Required skills:</Text>
                  <Flex align='center' gap={12} wrap='wrap'>
                    {skills.map((skill) => (
                      <Badge key={skill} color='cyan'>
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>

                <Flex direction='column' gap={2}>
                  <Text>Description: </Text>
                  <Text>{summary}</Text>
                </Flex>

                <Flex align='center' justify='space-between' gap={24}>
                  <Group>
                    <Text>Views: {viewsCount}</Text>
                    <Text>Applications: {applications.length}</Text>
                  </Group>

                  {showApplyBtn && (
                    <Button onClick={applyJobHandler}>Apply</Button>
                  )}
                </Flex>
              </Stack>

              <Image
                fallbackSrc={DEFAULT_COMPANY_AVATAR}
                src={`${API_SERVER}/${companyLogo}`}
                w='160px'
                radius='md'
              />
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={1}>
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

              <Flex gap={12} wrap='wrap'>
                <Flex gap={10} align='center'>
                  <IconBuilding size={20} />
                  <Text c='teal'>{companyName}</Text>
                </Flex>

                <Flex align='center' gap={4}>
                  <IconUsersGroup size={16} />
                  <Text>{companyEmployeesCount} employers</Text>
                </Flex>
                <Flex align='center' gap={4}>
                  <IconMapPins size={16} />
                  <Text>{companyOffices}</Text>
                </Flex>
              </Flex>

              <Flex gap={12} wrap='wrap'>
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
              </Flex>

              {user?.role !== role && <MakeChatButton id={_id} />}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
