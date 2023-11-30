import { createTheme, rem, MantineColorsTuple } from '@mantine/core';
import { ContainerExt } from './components/Container/Container';

const primary: MantineColorsTuple = [
  '#ffebe5',
  '#ffd6cd',
  '#ffad9a',
  '#ff8063',
  '#ff5a36',
  '#ff4218',
  '#ff3507',
  '#e42600',
  '#cc1f00',
  '#b21300',
];

const secondary: MantineColorsTuple = [
  '#f3f4f6',
  '#e5e5e6',
  '#c8c9cc',
  '#aaacb4',
  '#8f929f',
  '#7e8292',
  '#757a8e',
  '#64687b',
  '#585d6e',
  '#4a5063',
];

export const theme = createTheme({
  fontFamily: 'Rubik, sans-serif',
  colors: {
    primary,
    secondary,
  },
  black: '#12141D',
  primaryColor: 'primary',
  primaryShade: { light: 6, dark: 8 },
  breakpoints: {
    xs: '36em', // 576
    sm: '48em', // 768
    md: '62em', // 992
    lg: '75em', // 1200
    xl: '100em', // 1600
  },
  headings: {
    fontFamily: 'Poppins, sans-serif',
    sizes: {
      h1: { fontSize: rem(88) },
    },
  },
  components: {
    Container: ContainerExt,
  },
});
