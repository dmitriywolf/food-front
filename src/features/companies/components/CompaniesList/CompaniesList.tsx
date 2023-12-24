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
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconStarFilled } from '@tabler/icons-react';
import { ROUTES } from 'shared/routes';
import {
  selectAllCompanies,
  selectIsLoading,
} from 'features/companies/companiesSlice';
import { useAppSelector } from 'store/hooks';

export default function CompaniesList() {
  const { t } = useTranslation();

  const allCmpanies = useAppSelector(selectAllCompanies);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <Box component='section'>
      <Container size='responsive'>
        <SimpleGrid cols={5} w='100%'>
          {allCmpanies.map(({ _id, company }) => (
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
      </Container>
    </Box>
  );
}
