import {
  Title,
  Card,
  Text,
  Stack,
  Group,
  Badge,
  ActionIcon,
  rem,
} from '@mantine/core';
import {
  IconMapPinFilled,
  IconEdit,
  IconChartArrowsVertical,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';

import { IVacancy } from '../../../types';

type VacancyCardProps = {
  vacancy: IVacancy;
};

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    applicationsCount,
    category,
    city,
    country,
    companyType,
    domain,
    employmentOptions,
    englishLevel,
    experienceLevel,
    salaryRange,
    skills,
    summary,
    title,
    updatedAt,
    viewsCount,
    workExperience,
  } = vacancy;

  return (
    <Card shadow='sm' padding='md' radius='md' withBorder>
      <Stack gap={10}>
        <Group justify='space-between'>
          <Title order={3}>
            {title}, {'  '} {salaryRange}$
          </Title>
          <Group>
            <Badge color='tomato'>Updated: {formatDT(updatedAt)}</Badge>
          </Group>
        </Group>
        <Group gap={8}>
          <Badge>{domain}</Badge>
          <Badge color='grape'>{category}</Badge>
          <Badge color='cyan'>{companyType}</Badge>
          <Badge color='green'>{employmentOptions}</Badge>
          <Badge color='pink'>English: {englishLevel}</Badge>
        </Group>
        <Group>
          <Badge
            color='teal'
            leftSection={<IconChartArrowsVertical size={16} />}
          >
            Level: {experienceLevel}
          </Badge>
          <Badge color='indigo'>Experience: {workExperience} years</Badge>
        </Group>
        <Badge color='blue' leftSection={<IconMapPinFilled size={16} />}>
          {country}, {city}
        </Badge>
        <Group gap={4}>
          {skills.split(', ').map((item) => (
            <Badge key={item} color='teal'>
              {item}
            </Badge>
          ))}
        </Group>
        <Text>{summary}</Text>
        <Group justify='space-between'>
          <Group>
            <Text>Views: {viewsCount}</Text>
            <Text>Applications: {applicationsCount}</Text>
          </Group>
          <Group>
            <ActionIcon variant='subtle' color='red' aria-label='Edit vacancy'>
              <IconEdit style={{ width: rem(24), height: rem(24) }} />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
