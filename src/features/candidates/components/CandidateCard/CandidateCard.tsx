import {
  Card,
  Text,
  Group,
  Badge,
  Image,
  Stack,
  Flex,
  Title,
} from '@mantine/core';
import { IconMapPin, IconCrown, IconUserCircle } from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';

import { IResume, ISeekerAccount } from '../../../types';

type CandidateCardProps = {
  candidate: ISeekerAccount;
};

export default function CandidateCard({ candidate }: CandidateCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, avatar, firstName, lastName, searchStatus, resume } = candidate;

  const {
    position,
    salaryExpectations,
    country,
    city,
    summary,
    workExperience,
    updatedAt,
  } = resume as IResume;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.candidates}/${_id}`);
  };

  return (
    <Card shadow='sm' padding='md' radius='md' onClick={navigateHandler}>
      <Flex align='flex-start' gap={24}>
        <Image src={avatar} w='160px' />

        <Stack gap={8} w='100%'>
          <Flex align='center' justify='space-between' w='100%'>
            <Title order={3}>
              {position}, {salaryExpectations} $
            </Title>
            <Group>
              <Badge color='grape'>{formatDT(updatedAt)}</Badge>
              <Badge color={searchStatus ? 'green' : 'gray'}>
                {searchStatus ? 'Active search' : 'Passive search'}
              </Badge>
            </Group>
          </Flex>

          <Flex gap={12} align='center'>
            <IconUserCircle />
            <Text c='teal'>
              {firstName} {lastName}
            </Text>
          </Flex>

          <Flex gap={12} align='center'>
            <IconCrown />
            <Text>{workExperience} years</Text>
          </Flex>
          <Group align='center'>
            <Flex gap={12} align='center'>
              <IconMapPin />
              <Text>
                {country}, {city}
              </Text>
            </Flex>
          </Group>
          <Text>{summary}</Text>
        </Stack>
      </Flex>
    </Card>
  );
}
