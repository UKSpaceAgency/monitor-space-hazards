import { defaults } from 'chart.js';

import { FORMAT_DATE, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { palette } from '@/ui/theme/colours';

import { chartFontFamily } from '../utils/font';

export const setChartDefaults = () => {
  defaults.color = palette.black;

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
        color: palette.black,
        usePointStyle: true,
        font: {
          size: 16,
        },
      },
    },
    tooltip: {
      ...defaults.plugins.tooltip,
      padding: 15,
      backgroundColor: palette.white,
      titleColor: palette.black,
      bodyColor: palette.black,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 0.5,
    },
  };

  defaults.scales.time.time.displayFormats = {
    hour: FORMAT_DATE_TIME,
    day: FORMAT_DATE,
  };

  defaults.scales.logarithmic.ticks.autoSkip = true;
  defaults.scales.logarithmic.ticks.maxTicksLimit = 8;
};
