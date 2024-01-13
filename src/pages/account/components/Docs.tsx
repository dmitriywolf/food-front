import { Grid } from '@mantine/core';
import { DocsList, Doc } from 'features/docs';

export default function Docs() {
  return (
    <Grid>
      <Grid.Col span={7}>
        <DocsList />
      </Grid.Col>
      <Grid.Col span={5}>
        <Doc />
      </Grid.Col>
    </Grid>
  );
}
