import { Card, Stack, Title, rem } from '@mantine/core';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function AuthTemplate({ title, children }: Props) {
  return (
    <Card shadow='sm' padding='lg' radius='md' w={rem(768)} withBorder>
      <Stack gap='md' align='center'>
        <Title>{title}</Title>
        {children}
      </Stack>
    </Card>
  );
}
