import type { ChartData } from 'chart.js';

import { dayjs, eachDayOfInterval } from '@/libs/Dayjs';

import { chartPalette } from '../base/theme';
import type { MissDistanceChartDataType } from './MissDistanceChart';

type Props = {
  sortedDataWithoutEphemerises: MissDistanceChartDataType;
  sortedData: MissDistanceChartDataType;
  sortedDataEphemerises: MissDistanceChartDataType;
  showSpecial: boolean;
  tca: string | undefined;
};

export const getMissDistanceChartDatasets = ({
  sortedDataWithoutEphemerises,
  sortedData,
  sortedDataEphemerises,
  showSpecial,
  tca,
}: Props): ChartData => ({
  datasets: [
    {
      label: 'Total',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.missDistance as any,
      })),
      borderColor: chartPalette.nspocBlue,
      backgroundColor: chartPalette.nspocBlue,
    },
    {
      label: 'Radial',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.radialMissDistance as any,
      })),
      borderColor: chartPalette.nspocRed,
      backgroundColor: chartPalette.nspocRed,
    },
    {
      label: 'In-track',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.intrackMissDistance as any,
      })),
      borderColor: chartPalette.nspocYellow,
      backgroundColor: chartPalette.nspocYellow,
    },
    {
      label: 'Cross-track',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.crosstrackMissDistance as any,
      })),
      borderColor: chartPalette.nspocGreen,
      backgroundColor: chartPalette.nspocGreen,
    },
    ...(showSpecial
      ? [
          {
            label: 'Special ephemeris Total',
            type: 'scatter' as const,
            data: sortedDataEphemerises.map(data => ({
              x: data.updateTime as any,
              y: data.missDistance as any,
            })),
            pointStyle: 'triangle',
            pointRadius: 5,
            backgroundColor: chartPalette.nspocBlue,
          },
          {
            label: 'Special ephemeris Radial',
            type: 'scatter' as const,
            data: sortedDataEphemerises.map(data => ({
              x: data.updateTime as any,
              y: data.radialMissDistance as any,
            })),
            pointStyle: 'triangle',
            pointRadius: 5,
            backgroundColor: chartPalette.nspocRed,
          },
          {
            label: 'Special ephemeris In-track',
            type: 'scatter' as const,
            data: sortedDataEphemerises.map(data => ({
              x: data.updateTime as any,
              y: data.intrackMissDistance as any,
            })),
            pointStyle: 'triangle',
            pointRadius: 5,
            backgroundColor: chartPalette.nspocYellow,
          },
          {
            label: 'Special ephemeris Cross-track',
            type: 'scatter' as const,
            data: sortedDataEphemerises.map(data => ({
              x: data.updateTime as any,
              y: data.crosstrackMissDistance as any,
            })),
            pointStyle: 'triangle',
            pointRadius: 5,
            backgroundColor: chartPalette.nspocGreen,
          },
        ]
      : []),
  ],
  labels: eachDayOfInterval({
    start: dayjs.utc(sortedData[0]?.updateTime),
    end: dayjs.utc(tca).add(1, 'day'),
  }),
});
