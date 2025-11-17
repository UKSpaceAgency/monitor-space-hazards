'use client';

import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { GabbardDataResponse } from '@/actions/getFragmentationEventGabbardData';
import { GabbardChart } from '@/components/charts/gabbard-chart/GabbardChart';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';

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

  return (
    <>
      <GabbardChart data={data} />
      <div className="flex flex-col items-center mb-4">
        <p className="govuk-body-s mb-1 mt-4 flex-1 self-start">{t('toggle_observation_date')}</p>
        <input className="w-full mx-auto accent-black" type="range" id="dateSlider" min="0" max={dates.length - 1} value={dates.indexOf(selectedDate) ?? 0} step="1" onChange={handleSelectDate} />
        <div className="flex w-full justify-between">
          {dates.map(date => (
            <p key={date} className="text-sm text-gray-500">
              <span>{dayjs(date).format(FORMAT_SHORT_DATE)}</span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export { GabbardPlotChart };
