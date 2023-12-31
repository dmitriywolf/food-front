import {
  Title,
  Card,
  Text,
  Stack,
  Group,
  Badge,
  ActionIcon,
  rem,
  Anchor,
  Flex,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  IconMapPinFilled,
  IconEdit,
  IconChartArrowsVertical,
  IconUserSearch,
} from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import { formatDT } from 'shared/utils';

import { IVacancy } from '../../../types';

type VacancyCardProps = {
  vacancy: IVacancy;
  onEdit: () => void;
};

export default function VacancyCard({ vacancy, onEdit }: VacancyCardProps) {
  const {
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
    workExperience,
    viewsCount,
    applications,
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
          <Badge color='teal'>{companyType}</Badge>
          <Badge color='teal'>{employmentOptions}</Badge>
          <Badge color='pink'>Eng: {englishLevel}</Badge>
          <Badge
            color='teal'
            leftSection={<IconChartArrowsVertical size={16} />}
          >
            {experienceLevel}
          </Badge>
          <Badge color='indigo'>{workExperience} years</Badge>
          <Badge color='blue' leftSection={<IconMapPinFilled size={16} />}>
            {country}, {city}
          </Badge>
        </Group>

        <Group gap={4}>
          <Text>Skills: </Text>
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
            {/* <Text>Applications: {applicationsCount}</Text> */}
          </Group>
          <Group>
            <ActionIcon
              variant='subtle'
              color='red'
              aria-label='Edit vacancy'
              onClick={onEdit}
            >
              <IconEdit style={{ width: rem(24), height: rem(24) }} />
            </ActionIcon>
          </Group>
        </Group>

        <Flex gap={8} direction='column'>
          <Text>Applications: {applications.length}</Text>
          {applications.map(({ _id, firstName, lastName }) => (
            <Flex key={_id} gap={8}>
              <IconUserSearch size={20} />
              <Anchor
                component={Link}
                target='_blank'
                to={`${ROUTES.candidates}/${_id}`}
              >
                {firstName} {lastName}
              </Anchor>
            </Flex>
          ))}
        </Flex>
      </Stack>
    </Card>
  );
}
