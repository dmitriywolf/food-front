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
import { formatDT } from 'shared/utils';
import { IconCoin, IconMapPin, IconBuildingCastle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ICompany, IJob } from '../../../types';

type JobCardProps = {
  job: IJob;
};

export default function JobCard({ job }: JobCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    author,
    city,
    country,
    updatedAt,
    salaryRange,
    title,
    summary,
    category,
    companyType,
  } = job;

  const { companyLogo, companyName } = author as ICompany;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.jobs}/${_id}`);
  };

  return (
    <Card shadow='sm' padding='md' radius='md' onClick={navigateHandler}>
      <Flex justify='space-between' align='flex-start'>
        <Stack gap={8}>
          <Title order={3}>{title}</Title>

          <Flex gap={12} align='center'>
            <IconCoin />
            <Text>{salaryRange} $</Text>
            <Text>{category}</Text>
            <Badge color='cyan'>Updated: {formatDT(updatedAt)}</Badge>
          </Flex>
          <Group align='center'>
            <Flex gap={12} align='center'>
              <IconBuildingCastle />
              <Text c='teal'>{companyName}</Text>
            </Flex>
            <Text>{companyType}</Text>
            <Flex gap={12} align='center'>
              <IconMapPin />
              <Text>
                {country}, {city}
              </Text>
            </Flex>
          </Group>
          <Text>{summary}</Text>
        </Stack>
        <Image src={companyLogo} w='100px' />
      </Flex>
    </Card>
  );
}
