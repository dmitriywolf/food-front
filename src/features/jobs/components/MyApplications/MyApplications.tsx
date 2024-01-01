import { Stack } from '@mantine/core';

import { useAppSelector } from 'store/hooks';
import {
  selectMyApplications,
  // selectIsLoading
} from '../../jobsSlice';
import { JobCard } from '../JobCard';

export default function MyApplications() {
  const applications = useAppSelector(selectMyApplications);
  // const isLoading = useAppSelector(selectIsLoading);

  return (
    <Stack gap={24}>
      {applications.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Stack>
  );
}
