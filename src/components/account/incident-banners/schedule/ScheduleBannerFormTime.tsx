'use client';

import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import type { UseFormResetField, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import type { TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import DatetimeInput from '@/ui/datetime/datetime';
import Radios from '@/ui/radios/radios';

type ScheduleBannerFormTimeProps = {
  setValue: UseFormSetValue<TypeBannerScheduleIn>;
  watch: UseFormWatch<TypeBannerScheduleIn>;
  resetField: UseFormResetField<TypeBannerScheduleIn>;
};

enum ActivateTime {
  NOW,
  CUSTOM,
}

const ScheduleBannerFormTime = ({ setValue, watch, resetField }: ScheduleBannerFormTimeProps) => {
  const [activateTime, setActivateTime] = useState<ActivateTime>(ActivateTime.NOW);

  const startDate = watch('broadcastStart');
  const endDate = watch('broadcastEnd');

  const setStartDate = (date: string) => {
    setValue('broadcastStart', date);
  };

  const setEndDate = (date: string) => {
    setValue('broadcastEnd', date);
  };

  useEffect(() => {
    if (activateTime === ActivateTime.NOW) {
      resetField('broadcastStart');
      resetField('broadcastEnd');
    }
  }, [activateTime, resetField]);

  const onActivateTimeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    setActivateTime(Number(e.currentTarget.value) as ActivateTime);
  };

  return (
    <div>
      <h2 className="app-task-list__section govuk-heading-m">2. Select the incident banner you would like to display</h2>
      <Radios
        items={[
          {
            name: 'activateTime',
            children: 'Activate incident banner now',
            conditional: (
              <p className="govuk-body">
                The banner will be visible on the site until you remove it.
              </p>
            ),
            value: ActivateTime.NOW,
            checked: activateTime === ActivateTime.NOW,
            onChange: onActivateTimeHandler,
          },
          {
            name: 'activateTime',
            children: 'Choose custom time period to display banner for',
            conditional: (
              <>
                <DatetimeInput
                  dateLabel="Enter start date"
                  timeLabel="Enter start time"
                  value={startDate}
                  onChange={setStartDate}
                />
                <DatetimeInput
                  dateLabel="Enter end date"
                  timeLabel="Enter end time"
                  value={endDate}
                  onChange={setEndDate}
                />
              </>
            ),
            value: ActivateTime.CUSTOM,
            checked: activateTime === ActivateTime.CUSTOM,
            onChange: onActivateTimeHandler,

          },
        ]}
      />
    </div>
  );
};

export { ScheduleBannerFormTime };
