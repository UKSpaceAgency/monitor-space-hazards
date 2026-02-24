import { useTranslations } from 'next-intl';
import { type ChangeEvent, Fragment } from 'react';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Checkbox from '@/ui/checkbox/checkbox';
import Details from '@/ui/details/details';

import type { OverflightType } from './utils';

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

  const renderCheckbox = ({ id, value, label, date }: { id: string; value: number; label: string; date?: string }) => {
    return (
      <Checkbox id={id} className="content-baseline mb-0" value={value} checked={selected.includes(value)} onChange={handleChange} full>
        <div className="flex w-full justify-between items-center">
          <div>
            {label}
            {date && <span className="block govuk-body-s mb-0">{dayjs(date).format(FORMAT_DATE_TIME)}</span>}
          </div>
        </div>
      </Checkbox>
    );
  };

  return (
    <div data-pdf-ignore>
      <fieldset>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--s"><h4>{t('legend')}</h4></legend>
        <div className="grid md:grid-cols-2 md:gap-4 govuk-checkboxes govuk-checkboxes--small md:py-4 md:pl-[25px]">
          <Checkbox id="show-flightpaths" full checked={types.includes('FLIGHTPATH')} value="FLIGHTPATH" onChange={handleTypeChange}>
            <span className="flex items-center gap-2">
              {t('show_flightpaths')}
              <span className="block size-5 rounded-full bg-[#007CC8]"></span>
            </span>
          </Checkbox>
          <Checkbox id="show-fragments" full checked={types.includes('FRAGMENT')} value="FRAGMENT" onChange={handleTypeChange}>
            <span className="flex items-center gap-2">
              {t('show_fragments')}
              <span className="block size-5 rounded-full bg-[#C00000]"></span>
            </span>
          </Checkbox>
        </div>
      </fieldset>
      <Details summary={t.rich('help')} initiallyOpen>
        <fieldset className="grid md:grid-cols-2 gap-4 govuk-checkboxes govuk-checkboxes--small">
          <legend className="govuk-visually-hidden">Toggle overflights and ground fragments</legend>
          {renderCheckbox({ id: 'flightpaths', value: 0, label: t('flightpath') })}
          {overflights.map((overflight, index) => {
            const number = index + 1;
            return (
              <Fragment key={overflight}>
                {renderCheckbox({ id: `overflight-${number}`, value: number, label: t('overflight', { number }), date: overflight })}
              </Fragment>
            );
          })}
        </fieldset>
      </Details>
    </div>
  );
};

export { ReentryAlertOverflights };
