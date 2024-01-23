import { Logo, MainMenu } from 'components';
import { Container, Grid, Box } from '@mantine/core';
import { AuthMenu, ProfileMenu } from 'features/user';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <Box component='header' className={classes.wrap}>
      <Container size='responsive'>
        <Grid className={classes.inner} align='center'>
          <Grid.Col
            span={{ base: 4, xs: 3, sm: 3, md: 4, lg: 3 }}
            className={classes.logoCol}
          >
            <Logo />
          </Grid.Col>

          <Grid.Col
            span={{ base: 2, xs: 2, sm: 3, md: 4, lg: 6 }}
            className={classes.menuCol}
          >
            <MainMenu />
          </Grid.Col>

          <Grid.Col
            span={{ base: 6, xs: 7, sm: 6, md: 4, lg: 3 }}
            className={classes.authCol}
          >
            <Box className={classes.authWrap}>
              <AuthMenu />
            </Box>
            <ProfileMenu />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
