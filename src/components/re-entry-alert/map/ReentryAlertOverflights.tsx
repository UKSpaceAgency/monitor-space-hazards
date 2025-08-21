import { useTranslations } from 'next-intl';
import { type ChangeEvent, Fragment } from 'react';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Checkbox from '@/ui/checkbox/checkbox';
import Details from '@/ui/details/details';

import type { OverflightType } from './utils';
import { FlightpathColor, OverflightColors } from './utils';

type ReentryAlertOverflightsProps = {
  types: OverflightType[];
  setTypes: (value: OverflightType[]) => void;
  overflights: string[];
  selected: number[];
  onChange: (value: number[]) => void;
};

const ReentryAlertOverflights = ({ types, setTypes, overflights, selected, onChange }: ReentryAlertOverflightsProps) => {
  const t = useTranslations('OverflightMap.overflights');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedSet = new Set(selected);
    const value = Number.parseInt(e.target.value, 10);
    if (selectedSet.has(value)) {
      selectedSet.delete(value);
    } else {
      selectedSet.add(value);
    }
    onChange([...selectedSet]);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as OverflightType;
    setTypes(types.includes(value) ? types.filter(type => type !== value) : [...types, value]);
  };

  const renderCheckbox = ({ value, label, date, color }: { value: number; label: string; date?: string; color?: string }) => {
    return (
      <Checkbox className="content-baseline mb-0" value={value} checked={selected.includes(value)} onChange={handleChange} full>
        <div className="flex w-full justify-between items-center">
          <div>
            {label}
            {date && <span className="block govuk-body-s mb-0">{dayjs(date).format(FORMAT_DATE_TIME)}</span>}
          </div>
          <div className="size-5 rounded-full" style={{ backgroundColor: color }} />
        </div>
      </Checkbox>
    );
  };

  return (
    <div>
      <fieldset>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--s"><b>{t('label')}</b></legend>
        <div className="grid md:grid-cols-2 md:gap-4 govuk-checkboxes govuk-checkboxes--small md:py-4 md:pl-[25px]">
          <Checkbox full checked={types.includes('FLIGHTPATH')} value="FLIGHTPATH" onChange={handleTypeChange}>
            {t('show_flightpaths')}
          </Checkbox>
          <Checkbox full checked={types.includes('FRAGMENT')} value="FRAGMENT" onChange={handleTypeChange}>
            {t('show_fragments')}
          </Checkbox>
        </div>
      </fieldset>
      <Details summary={t('help')}>
        <div className="grid md:grid-cols-2 gap-4 govuk-checkboxes govuk-checkboxes--small">
          {renderCheckbox({ value: 0, label: t('flightpath'), color: FlightpathColor })}
          {overflights.map((overflight, index) => {
            const number = index + 1;
            return (
              <Fragment key={overflight}>
                {renderCheckbox({ value: number, label: t('overflight', { number }), date: overflight, color: OverflightColors[number] ?? '#fff' })}
              </Fragment>
            );
          })}
        </div>
      </Details>
    </div>
  );
};

export { ReentryAlertOverflights };
