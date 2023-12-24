import React from 'react';
import {
  Stack,
  Title,
  Text,
  Card,
  Avatar,
  Anchor,
  Button,
} from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import { selectCurrentJob } from 'features/jobs/jobsSlice';

export default function JobDetailes() {
  const jobData = useAppSelector(selectCurrentJob);

  return (
    <Stack>
      <Title>
        {jobData?.title}
        <Text>${jobData?.salaryFrom}</Text>
      </Title>
      {/* Company */}
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Text>Company:</Text>
        <Avatar />
        <Text>{jobData?.author.company.name}</Text>

        <Text>
          {jobData?.author.firstName} {jobData?.author.lastName},{' '}
          {jobData?.author.userPosition}
        </Text>
        <Text>
          Company employees:
          {jobData?.author.company.employeesCount}
        </Text>
        <Text>
          Company website: <Anchor>{jobData?.author.company.webSite}</Anchor>
        </Text>

        <Text>
          DOU company page:: <Anchor>{jobData?.author.company.douPage}</Anchor>
        </Text>
      </Card>

      {/* Job */}
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Text>Category: {jobData?.category}</Text>
        <Text>Applications Count: {jobData?.applicationsCount}</Text>
        <Text>
          Location: {jobData?.country}/{jobData?.city}
        </Text>
        <Text>Domain: {jobData?.domain}</Text>
        <Text>Options: {jobData?.employmentOptions}</Text>
        <Text>English level: {jobData?.englishLevel}</Text>
        <Text>Level: {jobData?.experienceLevel}</Text>
        <Text>Work Experience: {jobData?.workExperience}</Text>
        <Text>Summary: {jobData?.summary}</Text>
      </Card>
      <Button>Apply</Button>
    </Stack>
  );
}
