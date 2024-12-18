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
      borderColor: chartPalette.darkBlue,
      backgroundColor: chartPalette.darkBlue,
    },
    {
      label: 'Radial',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.radialMissDistance as any,
      })),
      borderColor: chartPalette.orange,
      backgroundColor: chartPalette.orange,
    },
    {
      label: 'In-track',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.intrackMissDistance as any,
      })),
      borderColor: chartPalette.darkPink,
      backgroundColor: chartPalette.darkPink,
    },
    {
      label: 'Cross-track',
      data: sortedDataWithoutEphemerises.map(data => ({
        x: data.updateTime as any,
        y: data.crosstrackMissDistance as any,
      })),
      borderColor: chartPalette.turquoise,
      backgroundColor: chartPalette.turquoise,
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
            backgroundColor: chartPalette.darkBlue,
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
            backgroundColor: chartPalette.orange,
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
            backgroundColor: chartPalette.darkPink,
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
            backgroundColor: chartPalette.turquoise,
          },
        ]
      : []),
  ],
  labels: eachDayOfInterval({
    start: dayjs.utc(sortedData[0]?.updateTime),
    end: dayjs.utc(tca).add(1, 'day'),
  }),
});
