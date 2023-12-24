import React from 'react';
import { useAppSelector } from 'store/hooks';
import { Card, Group, Text, Anchor, Avatar } from '@mantine/core';
import { selectCurrentCompany } from 'features/companies/companiesSlice';

export default function CompanyInfo() {
  const companyData = useAppSelector(selectCurrentCompany);

  const { data, jobs } = companyData;

  return (
    <Group>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Avatar />
        <Text>{data?.userPosition}</Text>
        <Text>{data?.email}</Text>
        <Text>
          {data?.firstName} - {data?.lastName}
        </Text>
        <Anchor>{data?.linkedin}</Anchor>
        <Text>{data?.phone}</Text>
      </Card>

      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Avatar />
        <Text>{data?.company.name}</Text>
        <Anchor>{data?.company.webSite}</Anchor>
        <Anchor>{data?.company.douPage}</Anchor>
        <Text>{data?.company.employeesCount}</Text>
      </Card>
    </Group>
  );
}
