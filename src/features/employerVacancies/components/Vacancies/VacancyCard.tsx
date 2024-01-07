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
  } = vacancy;

  return (
    <Card shadow='sm' padding='md' radius='md' withBorder>
      <Stack gap={8}>
        <Group justify='space-between'>
          <Title order={3}>
            {title}, {'  '} {salaryRange}$
          </Title>
          <Group>
            <Badge color='gray'>{formatDT(updatedAt)}</Badge>
            {isArchive && <Badge color='red'>Arhived</Badge>}
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

        <Group gap={8}>
          <Badge>Domain: {domain}</Badge>
          <Badge color='grape'>Category: {category}</Badge>
        </Group>

        <Group gap={8}>
          <Badge color='teal'>Company type: {companyType}</Badge>
          {employment.map((e) => (
            <Badge key={e} color='cyan'>
              {e}
            </Badge>
          ))}
        </Group>

        <Group gap={8}>
          <Badge color='teal'>Level: {experienceLevel}</Badge>
          <Badge color='indigo'>{workExperience} years</Badge>
          <Badge color='pink'>Eng: {englishLevel}</Badge>
        </Group>

        <Group>
          <Badge color='blue' leftSection={<IconMapPinFilled size={16} />}>
            {country}, {city}
          </Badge>
        </Group>

        <Group gap={4}>
          <Text>Skills: </Text>
          {skills.map((item) => (
            <Badge key={item} color='grey'>
              {item}
            </Badge>
          ))}
        </Group>

        <Text>{summary}</Text>

        <Text>Views: {viewsCount}</Text>

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
