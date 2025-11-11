import { defaults } from 'chart.js';

import { FORMAT_DATE, FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { chartFontFamily, chartPalette } from './theme';

export const setChartDefaults = ({
  isTimeScale = true,
  isLogarithmicScale = false,
}: {
  isTimeScale?: boolean;
  isLogarithmicScale?: boolean;
}) => {
  defaults.color = chartPalette.black;

  defaults.font = {
    family: chartFontFamily,
    size: 12,
  };

  defaults.plugins = {
    ...defaults.plugins,
    legend: {
      ...defaults.plugins.legend,
      position: 'bottom',
      labels: {
        ...defaults.plugins.legend.labels,
        color: chartPalette.black,
        usePointStyle: true,
        font: {
          size: 16,
        },
      },
    },
    tooltip: {
      ...defaults.plugins.tooltip,
      padding: 15,
      backgroundColor: chartPalette.white,
      titleColor: chartPalette.black,
      bodyColor: chartPalette.black,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 0.5,
    },
  };

  if (isTimeScale) {
    defaults.scales.time.time.displayFormats = {
      hour: FORMAT_DATE_TIME,
      day: FORMAT_DATE,
    };
  }

  if (isLogarithmicScale) {
    defaults.scales.logarithmic.ticks.autoSkip = true;
    defaults.scales.logarithmic.ticks.maxTicksLimit = 8;
  }
};
