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
import {
  IconMapPin,
  IconCrown,
  IconUserCircle,
  IconChartBar,
  IconLanguage,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { useNavigate } from 'react-router-dom';
import { API_SERVER } from 'shared/constants';
import { ROUTES } from 'shared/routes';

import { IResume, ISeekerAccount } from '../../../types';

type ResumeCardProps = {
  resume: IResume;
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    position,
    salaryExpectations,
    country,
    city,
    summary,
    workExperience,
    updatedAt,
    experienceLevel,
    owner,
    englishLevel,
  } = resume;

  const { avatar, firstName, lastName, searchStatus } = owner as ISeekerAccount;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.resumes}/${_id}`);
  };

  return (
    <Card shadow='sm' padding='md' radius='md' onClick={navigateHandler}>
      <Flex align='flex-start' gap={24}>
        <Image src={`${API_SERVER}/${avatar}`} w='160px' radius='md' />

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

          <Flex gap={24}>
            <Flex gap={12} align='center'>
              <IconCrown />
              <Text>{workExperience} years</Text>
            </Flex>

            <Flex gap={12} align='center'>
              <IconChartBar />
              <Text>{experienceLevel}</Text>
            </Flex>

            <Flex gap={12} align='center'>
              <IconLanguage />
              <Text>{englishLevel}</Text>
            </Flex>
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
