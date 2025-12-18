import { colors } from 'tailwind.config';

// https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/#relevant-success-criteria-for-colours-in-charts
export const chartPalette = {
  ...colors,
  // These colors are required to keep sufficient contrast
  orange: '#f46a25',
  darkBlue: '#12436d',
  lightPurple: '#28A197',
  darkGrey: '#3d3d3d',
  nspocBlue: '#007CC8',
  nspocRed: '#C00000',
  nspocYellow: '#FFC000',
  nspocGreen: '#92D050',
} as const;

export const chartColors = [
  chartPalette.nspocBlue,
  chartPalette.nspocRed,
  chartPalette.nspocYellow,
  chartPalette.nspocGreen,
  chartPalette.lightPurple,
  chartPalette.turquoise,
  chartPalette.lightBlue,
  chartPalette.midBlue,
  chartPalette.brightBlue,
  chartPalette.orange,
];

export const brandColors = {
  SpaceTrack: chartPalette.nspocBlue,
  UKSA: chartPalette.nspocRed,
};

export const chartFontFamily = '"GDS Transport", arial, sans-serif';
