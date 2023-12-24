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
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useTranslation } from 'react-i18next';
import { selectTopJobs, selectIsLoading } from 'features/jobs/jobsSlice';
import { useAppSelector } from 'store/hooks';

export default function TopJobs() {
  const { t } = useTranslation();

  const topJobs = useAppSelector(selectTopJobs);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={48} align='center'>
          <Stack gap={0} w='100%'>
            <Title order={2}>Most applied jobs</Title>
            <Text c='secondary'>
              {t('know_your_worth_and_find_the_job_that_qualify_your_life')}
            </Text>
          </Stack>
          <Stack w='100%'>
            {topJobs.map(
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

          <Link to={ROUTES.jobs}>
            <Button>{t('see_more_jobs')}</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
