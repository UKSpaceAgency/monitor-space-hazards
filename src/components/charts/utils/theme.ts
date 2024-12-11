import { palette } from '../../../ui/theme';

export type ChartPaletteType = Record<keyof typeof palette, string> & {
  brightBlue: string;
  darkPink: string;
};

// https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/#relevant-success-criteria-for-colours-in-charts
export const chartPalette: ChartPaletteType = {
  ...palette,
  darkBlue: '#12436d',
  brightBlue: '#c9def0',
  darkGrey: '#3d3d3d',
  darkPink: '#801650',
  lightPurple: '#a285d1',
  orange: '#f46a25',
};

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
