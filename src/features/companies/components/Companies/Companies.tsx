import { Box, SimpleGrid } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import CompanyCard from './CompanyCard';
import {
  selectCompanies,
  // selectIsLoading
} from '../../companiesSlice';

export default function Companies() {
  const companies = useAppSelector(selectCompanies);
  // const isLoading = useAppSelector(selectIsLoading);

  return (
    <Box component='section'>
      <SimpleGrid cols={4} py={12}>
        {companies.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
