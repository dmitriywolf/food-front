import { Stack, Grid } from '@mantine/core';

import { useAppSelector } from 'store/hooks';
import {
  selectJobs,
  // selectIsLoading
} from '../../jobsSlice';
import { JobCard } from '../JobCard';
import { JobsFilter } from '../Filter';

export default function Jobs() {
  const jobs = useAppSelector(selectJobs);
  // const isLoading = useAppSelector(selectIsLoading);

  return (
    <Grid>
      <Grid.Col span={9}>
        <Stack gap={24}>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={3}>
        <JobsFilter />
      </Grid.Col>
    </Grid>
  );
}
