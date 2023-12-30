import React from 'react';
import { Stack, Title, Text, Card, Avatar } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import { selectCurrentCandidate } from '../../candidatesSlice';

export default function CandidateDetails() {
  const candidate = useAppSelector(selectCurrentCandidate);

  return (
    <Stack>
      {/* Seeker */}
      <Card shadow='sm' padding='md' radius='md' withBorder>
        User contacts:
        <Avatar />
        <Text>
          {candidate?.firstName} {candidate?.lastName}
        </Text>
        <Text>Email: {candidate?.email}</Text>
        <Text>Phone: {candidate?.phone}</Text>
        <Text>Linkedin: {candidate?.linkedin}</Text>
        <Text>Github: {candidate?.github}</Text>
        <Text>Portfolio: {candidate?.portfolio}</Text>
        <Text>Telegram: {candidate?.telegram}</Text>
        <Text>Skype: {candidate?.skype}</Text>
      </Card>
      {/* Resume */}
      <Card shadow='sm' padding='md' radius='md' withBorder>
        {/* <Title>{candidate?.resume.position}</Title>
        <Text>Salary expectation: ${candidate?.resume.salaryExpectations}</Text>
        <Text>Category: {candidate?.resume.category}</Text>
        <Text>
          Location: {candidate?.resume.country} / {candidate?.resume.city}
        </Text>
        <Text>Ready to relocation: {candidate?.resume.relocation}</Text>
        <Text>Work experience: {candidate?.resume.workExperience} years</Text>
        <Text>English level: {candidate?.resume.englishLevel}</Text>
        <Text>Options: {candidate?.resume.employmentOptions}</Text>
        <Text>Summary: {candidate?.resume.summary}</Text> */}
      </Card>
    </Stack>
  );
}
