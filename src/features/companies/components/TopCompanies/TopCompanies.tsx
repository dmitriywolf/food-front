import React, { useEffect } from 'react';
import {
  Box,
  Stack,
  Container,
  Button,
  Title,
  SimpleGrid,
  Card,
  Text,
  Group,
  Badge,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconStarFilled } from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import {
  selectTopCompanies,
  selectIsLoading,
} from 'features/companies/companiesSlice';
import { getTopCompanies } from 'features/companies/services';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export default function TopCompanies() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const topCompanies = useAppSelector(selectTopCompanies);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getTopCompanies());
  }, [dispatch]);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={52} align='center'>
          <SimpleGrid cols={5} w='100%'>
            {topCompanies.map(({ _id, company }) => (
              <Card key={_id} shadow='sm' padding='md' radius='md' withBorder>
                <Title order={4}>{company.name}</Title>
                <Text size='sm' c='dimmed' mt='md'>
                  {company.summary}
                </Text>
                <Group mt='md'>
                  <IconStarFilled />
                  {company.employeesCount}
                  <Badge color='pink' variant='light'>
                    {company.hiresCount} hires
                  </Badge>
                </Group>
                <Link to={`${ROUTES.companies}/${_id}`}>
                  <Button variant='light' color='blue' mt='md'>
                    {t('view_jobs')}
                  </Button>
                </Link>
              </Card>
            ))}
          </SimpleGrid>
          <Link to={ROUTES.companies}>
            <Button>{t('view_all_companies')}</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
