import type { Config } from 'tailwindcss';

export const colors = {
  red: '#d4351c',
  yellow: '#ffdd00',
  green: '#00703c',
  blue: '#1d70b8',
  darkBlue: '#003078',
  lightBlue: '#4E89C1',
  brightBlue: '#c9def0',
  midBlue: '#2073BC',
  purple: '#4c2c92',
  black: '#0b0c0c',
  darkGrey: '#505a5f',
  midGrey: '#b1b4b6',
  lightGrey: '#f3f2f1',
  white: '#ffffff',
  lightPurple: '#6f72af',
  pink: '#d53880',
  darkPink: '#801650',
  lightPink: '#f499be',
  orange: '#f47738',
  brown: '#b58840',
  lightGreen: '#85994b',
  turquoise: '#28a197',
  transparent: 'transparent',
} as const;

export const theme: Config['theme'] = {
  fontFamily: {
    sans: ['GDS Transport', 'arial', 'sans-serif'],
  },
  colors,
  extend: {
    fontSize: {
      xxs: ['8px', '8px'],
    },
  },
};

export default {
  content: ['./src/**/*.tsx'],
  theme,
  plugins: [
    // eslint-disable-next-line ts/no-require-imports
    require('tailwindcss-content-visibility'),
  ],
} satisfies Config;
