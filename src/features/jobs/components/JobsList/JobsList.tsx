import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Button,
  Title,
  SimpleGrid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Flex,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconStarFilled } from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import { selectAllJobs, selectIsLoading } from 'features/jobs/jobsSlice';
import { useAppSelector } from 'store/hooks';

export default function JobsList() {
  const { t } = useTranslation();

  const allJobs = useAppSelector(selectAllJobs);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <Stack>
      {allJobs.map(
        ({
          _id,
          title,
          category,
          country,
          salaryFrom,
          englishLevel,
          summary,
        }) => (
          <Card key={_id} shadow='sm' padding='md' radius='md' withBorder>
            <Flex>
              <Group>
                <Title order={4}>{title}</Title>

                <Text size='sm' c='dimmed'>
                  {country}
                </Text>
                <Text size='sm' c='dimmed'>
                  {category}
                </Text>

                <Group>
                  {salaryFrom}
                  <Badge color='pink' variant='light'>
                    {englishLevel}
                  </Badge>
                </Group>
                <Text>{summary}</Text>
              </Group>
              <Link to={`${ROUTES.jobs}/${_id}`}>
                <Button>See details</Button>
              </Link>
            </Flex>
          </Card>
        ),
      )}
    </Stack>
  );
}
