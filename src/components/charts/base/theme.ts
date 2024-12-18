// https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/#relevant-success-criteria-for-colours-in-charts
export const chartPalette = {
  red: '#d4351c',
  yellow: '#ffdd00',
  green: '#00703c',
  blue: '#1d70b8',
  lightBlue: '#4E89C1',
  midBlue: '#2073BC',
  purple: '#4c2c92',
  black: '#0b0c0c',
  midGrey: '#b1b4b6',
  lightGrey: '#f3f2f1',
  white: '#ffffff',
  pink: '#d53880',
  lightPink: '#f499be',
  brown: '#b58840',
  lightGreen: '#85994b',
  turquoise: '#28a197',
  darkBlue: '#12436d',
  brightBlue: '#c9def0',
  darkGrey: '#3d3d3d',
  darkPink: '#801650',
  lightPurple: '#a285d1',
  orange: '#f46a25',
} as const;

export const chartColors = [
  chartPalette.darkBlue,
  chartPalette.orange,
  chartPalette.darkPink,
  chartPalette.lightPurple,
  chartPalette.turquoise,
  chartPalette.lightBlue,
  chartPalette.midBlue,
  chartPalette.brightBlue,
];

export const brandColors = {
  SpaceTrack: chartPalette.darkBlue,
  UKSA: chartPalette.orange,
};

export const chartFontFamily = '"GDS Transport", arial, sans-serif';
