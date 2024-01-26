import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Title, rem, Grid } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import {
  // getLevelStat,
  LevelChart,
  EmploymentChart,
  DomainsChart,
} from 'features/stat';

function StatisticsPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // dispatch(getLevelStat());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={rem(16)} py={rem(16)}>
          <Title>{t('statistics')}</Title>
          <Grid gutter='lg'>
            <Grid.Col span={12}>
              <LevelChart />
            </Grid.Col>
            <Grid.Col span={{ xl: 6 }}>
              <EmploymentChart />
            </Grid.Col>
            <Grid.Col span={{ xl: 6 }}>
              <DomainsChart />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default StatisticsPage;
