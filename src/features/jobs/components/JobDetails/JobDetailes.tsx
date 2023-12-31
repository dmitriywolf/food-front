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
} from '@mantine/core';
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
import { useAppSelector } from 'store/hooks';
import { selectCurrentJob } from '../../jobsSlice';
import { ICompany } from '../../../types';

export default function JobDetailes() {
  const job = useAppSelector(selectCurrentJob);

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

  return (
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

            <Flex align='center' gap={24}>
              <Text>Views: {viewsCount}</Text>
              <Text>Applications: {applications.length}</Text>
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
  );
}
