import {
  Card,
  Text,
  Group,
  Badge,
  Image,
  Anchor,
  Stack,
  Flex,
  Avatar,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { Link } from 'react-router-dom';
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
    companyDouPage,
    companyEmployeesCount,
    companyHiresCount,
    companyLogo,
    companyName,
    companyWebSite,
  } = company;

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
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
          <Anchor component={Link} to={`${ROUTES.companies}/${_id}`} c='cyan'>
            <Text fw={500}>{companyName}</Text>
          </Anchor>
          {companyHiresCount && <Badge color='pink'>Has hires</Badge>}
        </Group>

        <Group>
          <Badge color='teal'>{companyEmployeesCount} people</Badge>
          <Badge color='cyan'>Added: {formatDT(createdAt)}</Badge>
        </Group>

        <Text size='sm' c='dimmed'>
          {companyDescription}
        </Text>

        <Group align='center'>
          <Anchor c='cyan' size='sm' href={companyWebSite} target='_blank'>
            Website
          </Anchor>
          <Anchor c='cyan' size='sm' href={companyDouPage} target='_blank'>
            Dou page
          </Anchor>
        </Group>
      </Stack>
    </Card>
  );
}
