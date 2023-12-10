import { Logo, MainMenu } from 'components';
import { Container, Flex, Box, rem } from '@mantine/core';
import { AuthMenu } from 'features/user';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <Box component='header' className={classes.header}>
      <Container size='responsive'>
        <Flex className={classes.inner}>
          <Logo />
          <MainMenu />
          <Flex gap={rem(18)} align='center'>
            <AuthMenu />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
