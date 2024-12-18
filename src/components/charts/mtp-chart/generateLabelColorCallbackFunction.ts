import type { TooltipItem } from 'chart.js';

import type { BichromaticOptions } from './generateBichromaticOptions';
import type { ScatterChartValue } from './getMtpChartDatasets';

export type TooltipCallbackModel = TooltipItem<'scatter'> & { raw: ScatterChartValue };

export const generateLabelColorCallbackFunction = (options: BichromaticOptions[]) => {
  return ({ raw }: TooltipCallbackModel) => {
    if (raw.prob === null) {
      return;
    }

    const optionsSorted = options.sort((a, b) => b.thresh - a.thresh);

    for (const { color, thresh } of optionsSorted) {
      if (raw.prob >= thresh) {
        return {
          backgroundColor: color,
          borderColor: color,
        };
      }
    }
  };
};
