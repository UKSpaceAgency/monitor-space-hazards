import { colors } from 'tailwind.config';

// https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/#relevant-success-criteria-for-colours-in-charts
export const chartPalette = {
  ...colors,
  // These colors are required to keep sufficient contrast
  orange: '#f46a25',
  darkBlue: '#12436d',
  lightPurple: 'a285d1',
  darkGrey: '3d3d3d',
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
