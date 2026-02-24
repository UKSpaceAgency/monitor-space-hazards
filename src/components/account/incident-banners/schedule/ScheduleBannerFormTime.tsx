'use client';

import { useTranslations } from 'next-intl';
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
  LATER,
}

const ScheduleBannerFormTime = ({ setValue, watch, resetField }: ScheduleBannerFormTimeProps) => {
  const t = useTranslations('Forms.Schedule_banner');
  const [activateTime, setActivateTime] = useState<ActivateTime>(ActivateTime.NOW);

  const startDate = watch('broadcast_start');
  const endDate = watch('broadcast_end');

  const setStartDate = (date: string) => {
    setValue('broadcast_start', date);
  };

  const setEndDate = (date: string) => {
    setValue('broadcast_end', date);
  };

  useEffect(() => {
    if (activateTime === ActivateTime.NOW) {
      resetField('broadcast_start');
      resetField('broadcast_end');
    }
  }, [activateTime, resetField]);

  const onActivateTimeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    setActivateTime(Number(e.currentTarget.value) as ActivateTime);
  };

  return (
    <div>
      <h2 className="app-task-list__section govuk-heading-m">
        {t('when_display_banner')}
      </h2>
      <Radios
        id="activate"
        required
        legend={t('choose_one')}
        aria-label="Activate"
        items={[
          {
            id: 'activate_now',
            name: 'activateTime',
            children: t('activate_now'),
            conditional: (
              <p className="govuk-body">
                {t('activate_now_help')}
              </p>
            ),
            value: ActivateTime.NOW,
            checked: activateTime === ActivateTime.NOW,
            onChange: onActivateTimeHandler,
          },
          {
            id: 'activate_later',
            name: 'activateTime',
            children: t('activate_later'),
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
            value: ActivateTime.LATER,
            checked: activateTime === ActivateTime.LATER,
            onChange: onActivateTimeHandler,

          },
        ]}
      />
    </div>
  );
};

export { ScheduleBannerFormTime };
