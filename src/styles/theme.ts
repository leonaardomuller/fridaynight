import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    purple: {
      1: '#7B3EC8',
      2: '#5D22A8',
      3: '#3B087B'
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
    },
    gray: {
      1: '#200541',
      2: '#B1AABB',
      3: '#E4CEFF',
      4: '#F4ECFF',
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56
  }
});