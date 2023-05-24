import { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {
  colors: {
    blue: ['#3B7CD3', '#5E96FC', '#92C1FF', '#B7D6FF', '#C9E0FF', '#DEECFF'],
    gray: ['#F5F5F6', '#EAEBED', '#D5D6DC', '#ACADB9', '#7B7C88'],
  },
  white: '#FFFFFF',
  black: '#232134',
  fontFamily: 'Inter',
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
  },
  fontSizes: {
    xs: '14px',
    sm: '16px',
    md: '20px',
    lg: '26px',
    xl: '28px',
  },
  primaryColor: 'blue',
  primaryShade: 1,
};
