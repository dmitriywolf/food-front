import { Card, Skeleton } from '@mantine/core';
import classes from './CardSkeleton.module.scss';

export default function CardSkeleton() {
  return (
    <Card
      shadow='sm'
      padding='sm'
      radius='md'
      withBorder
      className={classes.card}
    >
      <Skeleton height={150} mb={12} />
      <Skeleton height={16} radius='md' />
      <Skeleton height={16} mt={6} radius='md' />
      <Skeleton height={49} mt={6} radius='md' width='80%' />
    </Card>
  );
}
