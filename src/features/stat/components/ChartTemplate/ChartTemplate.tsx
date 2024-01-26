import { Card, LoadingOverlay, Loader, Title, Stack } from '@mantine/core';
import classes from './ChartTemplate.module.scss';

type ChartTemplateProps = {
  title: string;
  loading: boolean;
  error: string | null;
  children: string | JSX.Element | JSX.Element[];
};

export default function ChartTemplate({
  title,
  loading,
  error,
  children,
}: ChartTemplateProps) {
  return (
    <Card className={classes.card}>
      <Title order={4} className={classes.title}>
        {title}
      </Title>
      {loading ? (
        <LoadingOverlay
          visible={loading}
          loaderProps={{ children: <Loader color='primary' type='dots' /> }}
        />
      ) : error ? (
        <Title order={3}>{error}</Title>
      ) : (
        <Stack align='center'>{children}</Stack>
      )}
    </Card>
  );
}
