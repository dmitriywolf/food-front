import { Box, Stack, Container, Button, Title, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useTranslation } from 'react-i18next';
import JobsSimpleFilter from './JobsSimpleFilter';

export default function FeaturedJobs() {
  const { t } = useTranslation();

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={48} align='center'>
          <Stack gap={0} w='100%'>
            <Title order={2}>{t('featured_jobs')}</Title>
            <Text c='secondary'>
              {t('know_your_worth_and_find_the_job_that_qualify_your_life')}
            </Text>
          </Stack>
          <JobsSimpleFilter />
          <Link to={ROUTES.jobs}>
            <Button>{t('see_more_jobs')}</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
