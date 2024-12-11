import { chartPalette } from '../utils/theme';

export type BichromaticOptions = {
  thresh: number;
  label: string;
  color: string;
  target: number;
};

export const generateBichromaticOptions = (thresh: number): BichromaticOptions[] => {
  const exp = (value: number, fractionDigits = 0) =>
    value.toExponential(fractionDigits);
  const nextThresh = thresh * 1e-1;
  return [
    {
      thresh,
      label: `≥ ${exp(thresh)}`,
      color: chartPalette.brightBlue,
      target: -1,
    },
    {
      thresh: nextThresh,
      label: `≥ ${exp(nextThresh)} and < ${exp(thresh)} `,
      color: chartPalette.midBlue,
      target: 0,
    },
    {
      thresh: 0,
      label: `< ${exp(nextThresh)}`,
      color: chartPalette.darkBlue,
      target: 1,
    },
  ];
};
