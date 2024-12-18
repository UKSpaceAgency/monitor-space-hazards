import type { ChartTypeRegistry, TooltipOptions } from 'chart.js';

import type { BichromaticOptions } from './generateBichromaticOptions';
import type { TooltipCallbackModel } from './generateLabelColorCallbackFunction';
import { generateLabelColorCallbackFunction } from './generateLabelColorCallbackFunction';

type Props = {
  options: BichromaticOptions[];
  callbackLabel: ({ raw }: TooltipCallbackModel) => string[];
};

export const getMtpChartTooltipConfig = ({ options, callbackLabel }: Props): TooltipOptions<keyof ChartTypeRegistry> => {
  return {
    filter: ({ dataset }: TooltipCallbackModel) =>
      dataset.type === 'scatter',
    callbacks: {
      label: callbackLabel,
      labelColor: generateLabelColorCallbackFunction(options),
    },
  } as any as TooltipOptions;
};
