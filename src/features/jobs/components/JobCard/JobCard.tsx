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
import {
  IconCoin,
  IconMapPin,
  IconEye,
  IconUserPlus,
  IconBuilding,
  IconBuildingFortress,
} from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
import { useNavigate } from 'react-router-dom';
import { API_SERVER } from 'shared/constants';
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
    isArchive,
    domain,
    applications,
    viewsCount,
  } = job;

  const { companyLogo, companyName } = author as ICompany;

  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.jobs}/${_id}`);
  };

  const iAlreadyApplied = applications.find((id) => id === user?._id);

  return (
    <Card shadow='sm' padding='md' radius='md' onClick={navigateHandler}>
      <Flex justify='space-between' align='flex-start' gap={24}>
        <Stack gap={8} w='100%'>
          <Flex gap={12} justify='space-between'>
            <Flex gap={8} align='center'>
              <Title order={3}>{title}</Title>

              <Flex gap={8}>
                <IconEye size={20} />
                {viewsCount}
              </Flex>

              <Flex gap={8}>
                <IconUserPlus size={20} />
                {applications.length}
              </Flex>
            </Flex>

            <Flex gap={8} align='center'>
              <Text>{formatDT(updatedAt)}</Text>
              {iAlreadyApplied && (
                <Badge color='green' fw='bold'>
                  You are applied
                </Badge>
              )}
              {isArchive && (
                <Badge color='red' fw='bold'>
                  Archived
                </Badge>
              )}
            </Flex>
          </Flex>

          <Group align='center'>
            <Flex gap={12} align='center'>
              <IconBuilding />
              <Text c='teal'>{companyName}</Text>
            </Flex>
            <Flex gap={12} align='center'>
              <IconMapPin />
              <Text>
                {country}, {city}
              </Text>
            </Flex>
          </Group>

          <Flex gap={12} align='center'>
            <IconCoin />
            <Text>{salaryRange} $</Text>
            <IconBuildingFortress />
            <Text>{domain}</Text>
          </Flex>

          <Text>{summary}</Text>
        </Stack>
        <Image radius='md' src={`${API_SERVER}/${companyLogo}`} w='120px' />
      </Flex>
    </Card>
  );
}
