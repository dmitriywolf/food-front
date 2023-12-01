import {
  Box,
  Stack,
  Container,
  Button,
  Title,
  SimpleGrid,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import { useTranslation } from 'react-i18next';
import CompaniesList from './CompaniesList';

export default function FeaturedCompanies() {
  const { t } = useTranslation();

  return (
    <Box component='section'>
      <Container size='responsive'>
        <Stack gap={52} align='center'>
          {/* <Title order={2}>{t('featured_companies_actively_hiring')}</Title> */}
          <SimpleGrid cols={5} w='100%'>
            <CompaniesList />
          </SimpleGrid>

          <Link to={ROUTES.companies}>
            <Button>{t('view_all_companies')}</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
