import { Stack } from '@mantine/core';

import { useAppSelector } from 'store/hooks';
import {
  selectJobs,
  // selectIsLoading
} from '../../jobsSlice';
import { JobCard } from '../JobCard';

export default function Jobs() {
  const jobs = useAppSelector(selectJobs);
  // const isLoading = useAppSelector(selectIsLoading);

  return (
    <Stack gap={24}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Stack>
  );
}
