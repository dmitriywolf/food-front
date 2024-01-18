import { Container, Grid, Text, Box, Group, rem } from '@mantine/core';
import { LangSwitch, ThemeSwitch } from 'components';

import FooterMenu from './FooterMenu';
import classes from './Footer.module.scss';

export default function RootFooter() {
  return (
    <Box component='footer'>
      <Container size='responsive'>
        <Grid className={classes.footer}>
          <Grid.Col span={2}>
            <Text size='sm'>IThub @ 2024</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <FooterMenu />
          </Grid.Col>
          <Grid.Col span={2}>
            <Group justify='flex-end' gap={rem(6)}>
              <ThemeSwitch />
              <LangSwitch />
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
