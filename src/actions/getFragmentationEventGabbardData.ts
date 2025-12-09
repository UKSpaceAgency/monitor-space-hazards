'use server';

import { round } from 'lodash';

import Api from '@/libs/Api';

export type GabbardData = {
  period: number;
  apogee: number;
  perigee: number;
};

export type GabbardDataResponse = {
  actual_gabbard_points: GabbardData[];
  modelled_gabbard_points: GabbardData[];
};

export async function getFragmentationEventGabbardData(shortId: string) {
  const { data } = await Api.getFragmentationReportsFragmentationEventShortId({ shortId });

  const gabbardData = new Map<string, GabbardDataResponse>();

  await Promise.all(
    data.map(async (report) => {
      const response = await fetch(report.presigned_url);
      const reportData: GabbardDataResponse = (await response.json())[0];
      if (!reportData) {
        return;
      }

      gabbardData.set(report.event_epoch, {
        actual_gabbard_points: reportData.actual_gabbard_points.map(point => ({
          apogee: round(point.apogee, 2),
          perigee: round(point.perigee, 2),
          period: round(point.period, 2),
        })) ?? [],
        modelled_gabbard_points: reportData.modelled_gabbard_points.map(point => ({
          apogee: round(point.apogee, 2),
          perigee: round(point.perigee, 2),
          period: round(point.period, 2),
        })) ?? [],
      });
    }),
  );

  return gabbardData;
}
