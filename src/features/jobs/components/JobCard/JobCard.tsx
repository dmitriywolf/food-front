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
  IconBuildingCastle,
  IconEye,
  IconUserPlus,
} from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
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
      <Flex justify='space-between' align='flex-start'>
        <Stack gap={8}>
          <Flex align='center' gap={24}>
            <Title order={3}>{title}</Title>
            <Flex gap={8}>
              <IconEye size={20} />
              {viewsCount}
            </Flex>

            <Flex gap={8}>
              <IconUserPlus size={20} />
              {applications.length}
            </Flex>
            {iAlreadyApplied && (
              <Badge color='green' fw='bold'>
                Applied
              </Badge>
            )}
          </Flex>

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
