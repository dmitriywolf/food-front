import React from 'react';
import { Title, Card, Text, Flex, Group, Badge, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { IVacancy } from 'features/user/types';

export default function JobCard({
  _id,
  title,
  category,
  domain,
  workExperience,
  experienceLevel,
  salaryFrom,
  country,
  city,
  englishLevel,
  summary,
  companyType,
  employmentOptions,
}: IVacancy) {
  return (
    <Card key={_id} shadow='sm' padding='md' radius='md' withBorder>
      <Flex>
        <Group>
          <Title order={4}>
            {title}/${salaryFrom}
          </Title>

          <Text size='sm' c='dimmed'>
            {category} / {domain}
          </Text>

          <Text size='sm' c='dimmed'>
            {workExperience} / {experienceLevel}
          </Text>

          <Text size='sm' c='dimmed'>
            <Badge color='pink' variant='light'>
              {country} / {city}
            </Badge>
          </Text>

          <Text>{summary}</Text>

          <Button>Edit</Button>
        </Group>
      </Flex>
    </Card>
  );
}
