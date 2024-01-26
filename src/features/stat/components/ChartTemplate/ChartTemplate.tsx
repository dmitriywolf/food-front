import { Card, LoadingOverlay, Loader, Title } from '@mantine/core';

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
    <Card pos='relative'>
      <Title order={4} ta='center' c='secondary'>
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
        children
      )}
    </Card>
  );
}
