import {
  Card,
  Text,
  Group,
  Badge,
  Image,
  Stack,
  Flex,
  Avatar,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { ICompany } from '../../../types';
import classes from './CompanyCard.module.scss';

type CompanyCardProps = {
  company: ICompany;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    createdAt,
    firstName,
    lastName,
    companyDescription,
    companyEmployeesCount,
    companyHiresCount,
    companyLogo,
    companyName,
  } = company;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.companies}/${_id}`);
  };

  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
      onClick={navigateHandler}
    >
      <Card.Section className={classes.imgWrap}>
        <Image src={companyLogo} w='100%' h={250} />
        <Flex className={classes.avatarWrap}>
          <Avatar src={avatar} />
          <Text>
            {firstName} {lastName}
          </Text>
        </Flex>
      </Card.Section>

      <Stack gap={12} mt='xs'>
        <Group justify='space-between'>
          <Text size='md' c='cyan' fw={500}>
            {companyName}
          </Text>
          {companyHiresCount && <Badge color='pink'>Has hires</Badge>}
        </Group>

        <Group>
          <Badge color='teal'>{companyEmployeesCount} people</Badge>
          <Badge color='cyan'>Added: {formatDT(createdAt)}</Badge>
        </Group>

        <Text size='sm' c='dimmed' ta='justify'>
          {companyDescription}
        </Text>
      </Stack>
    </Card>
  );
}
