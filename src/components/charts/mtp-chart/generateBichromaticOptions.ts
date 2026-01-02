import { displayExponential } from '@/utils/Math';

import { chartPalette } from '../base/theme';

export type BichromaticOptions = {
  thresh: number;
  label: string;
  color: string;
  target: number;
};

export const generateBichromaticOptions = (thresh: number): BichromaticOptions[] => {
  const exp = (value: number, fractionDigits = 0) =>
    displayExponential(value, fractionDigits);
  const nextThresh = thresh * 1e-1;
  return [
    {
      thresh,
      label: `≥ ${exp(thresh)}`,
      color: chartPalette.nspocRed,
      target: -1,
    },
    {
      thresh: nextThresh,
      label: `≥ ${exp(nextThresh)} and < ${exp(thresh)} `,
      color: chartPalette.nspocYellow,
      target: 0,
    },
    {
      thresh: 0,
      label: `< ${exp(nextThresh)}`,
      color: chartPalette.nspocBlue,
      target: 1,
    },
  ];
};
