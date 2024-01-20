import { Logo, MainMenu } from 'components';
import { Container, Flex, Box } from '@mantine/core';
import { AuthMenu, ProfileMenu } from 'features/user';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <Box component='header' className={classes.header}>
      <Container size='responsive'>
        <Flex className={classes.inner}>
          <Logo />
          <MainMenu />
          <AuthMenu />
          <ProfileMenu />
        </Flex>
      </Container>
    </Box>
  );
}
