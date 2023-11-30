import {
  // ThemeSwitch,
  Logo,
  MainMenu,
  AuthMenu,
} from 'components';
import { Container, Flex, rem } from '@mantine/core';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <header className={classes.header}>
      <Container size='responsive'>
        <Flex align='center' className={classes.headerInner}>
          <Logo />
          <MainMenu />
          <Flex gap={rem(18)} align='center'>
            <AuthMenu />
            {/* <ThemeSwitch /> */}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
