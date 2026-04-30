'use client';

import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { GabbardDataResponse } from '@/actions/getFragmentationEventGabbardData';
import { GabbardChart } from '@/components/charts/gabbard-chart/GabbardChart';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

type GabbardScaleBounds = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

const GabbardPlotChart = ({ dates, gabbardData }: { dates: string[]; gabbardData: Map<string, GabbardDataResponse> }) => {
  const t = useTranslations('Charts.Gabbard_chart');
  const [selectedDate, setSelectedDate] = useState<string>(dates[dates.length - 1] ?? '');

  const handleSelectDate = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(dates[Number(date)] ?? '03/10/24');
  };

  const data = gabbardData.get(selectedDate);
  if (!data) {
    return <div>No data available</div>;
  }

  const scaleBounds = Array.from(gabbardData.values()).reduce<GabbardScaleBounds>(
    (bounds, currentData) => {
      const allPoints = [...currentData.actual_gabbard_points, ...currentData.modelled_gabbard_points];
      if (allPoints.length === 0) {
        return bounds;
      }

      const currentXMin = Math.min(...allPoints.map(point => point.period));
      const currentXMax = Math.max(...allPoints.map(point => point.period));
      const currentYMax = Math.max(...allPoints.map(point => Math.max(point.apogee, point.perigee)));

      return {
        xMin: Math.min(bounds.xMin, currentXMin),
        xMax: Math.max(bounds.xMax, currentXMax),
        yMin: Math.min(bounds.yMin, 0),
        yMax: Math.max(bounds.yMax, currentYMax),
      };
    },
    { xMin: Number.POSITIVE_INFINITY, xMax: Number.NEGATIVE_INFINITY, yMin: 0, yMax: Number.NEGATIVE_INFINITY },
  );

  const normalizedScaleBounds: GabbardScaleBounds = {
    xMin: Number.isFinite(scaleBounds.xMin) ? Math.floor(scaleBounds.xMin) : 0,
    xMax: Number.isFinite(scaleBounds.xMax) ? Math.ceil(scaleBounds.xMax) : 1,
    yMin: 0,
    yMax: Number.isFinite(scaleBounds.yMax) ? Math.ceil(scaleBounds.yMax) : 1,
  };

  return (
    <>
      <GabbardChart
        data={data}
        scaleBounds={{
          xMin: normalizedScaleBounds.xMin,
          xMax: normalizedScaleBounds.xMax,
          yMin: normalizedScaleBounds.yMin,
          yMax: normalizedScaleBounds.yMax,
        }}
      />
      <div className="flex flex-col items-center mb-4">
        <p className="govuk-body-s mb-1 mt-4 flex-1 self-start">{t('toggle_observation_date')}</p>
        <input className="w-full mx-auto accent-black" type="range" id="dateSlider" min="0" max={dates.length - 1} value={dates.indexOf(selectedDate) ?? 0} step="1" onChange={handleSelectDate} />
        <div className="flex w-full justify-between gap-4">
          {dates.map(date => (
            <p key={date} className="text-xxs md:text-sm text-gray-500">
              <span>{dayjs(date).format(FORMAT_DATE_TIME)}</span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export { GabbardPlotChart };
