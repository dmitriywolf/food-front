import {
  Title,
  Card,
  Text,
  Group,
  Badge,
  Grid,
  Stack,
  Flex,
  Anchor,
  Image,
  SimpleGrid,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import {
  IconUserPlus,
  IconWorldWww,
  IconBuilding,
  IconUsers,
  IconMailFilled,
  IconBrandLinkedin,
} from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { selectCurrentCompany } from '../../companiesSlice';

export default function CompanyDetails() {
  const { data } = useAppSelector(selectCurrentCompany);

  const {
    avatar,
    createdAt,
    firstName,
    lastName,
    linkedin,
    email,
    emailVerified,
    companyDescription,
    companyDouPage,
    companyEmployeesCount,
    companyHiresCount,
    companyLogo,
    companyName,
    companyWebSite,
  } = data;

  return (
    <Grid columns={4}>
      <Grid.Col span={3}>
        <Card shadow='sm' padding='md' radius='md' withBorder>
          <Card.Section>
            <Image src={companyLogo} w='100%' h={250} />
          </Card.Section>
          <Stack gap={24} pt={24}>
            <Title ta='center'>{companyName}</Title>

            <SimpleGrid cols={2} spacing={24}>
              <Stack gap={12}>
                <Flex gap={8}>
                  <IconUsers />
                  <Text>{companyEmployeesCount} employers</Text>
                </Flex>

                {companyHiresCount && (
                  <Flex gap={8}>
                    <IconUserPlus />
                    <Text>Hires: {companyHiresCount}</Text>
                  </Flex>
                )}

                <Flex gap={8}>
                  <IconBuilding />
                  <Text>Added: {formatDT(createdAt)}</Text>
                </Flex>
              </Stack>

              <Stack gap={12}>
                <Flex gap={8}>
                  <IconWorldWww />
                  <Anchor href={companyWebSite} c='teal'>
                    Company site
                  </Anchor>
                </Flex>
                <Flex gap={8}>
                  <IconWorldWww />
                  <Anchor href={companyDouPage} c='teal'>
                    Dou page
                  </Anchor>
                </Flex>
              </Stack>
            </SimpleGrid>

            <Text>{companyDescription}</Text>
          </Stack>
        </Card>
      </Grid.Col>

      <Grid.Col span={1}>
        <Card shadow='sm' padding='md' radius='md' withBorder>
          <Card.Section>
            <Image src={avatar} w='100%' h={250} />
          </Card.Section>
          <Stack gap={24} pt={24}>
            <Group>
              <Title order={2}>
                {firstName} {lastName}
              </Title>
              <Badge color={emailVerified ? 'teal' : 'pink'}>
                {emailVerified ? 'Verified' : 'Unverified'}
              </Badge>
            </Group>
            <Group>
              <Flex gap={8}>
                <IconMailFilled />
                <Anchor href={`mailto:${email}`} c='teal'>
                  Mail me
                </Anchor>
              </Flex>
              <Flex gap={8}>
                <IconBrandLinkedin />
                <Anchor href={linkedin} c='teal'>
                  LinkedIn
                </Anchor>
              </Flex>
            </Group>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
