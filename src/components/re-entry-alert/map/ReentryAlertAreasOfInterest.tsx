import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import Checkbox, { type CheckboxProps } from '@/ui/checkbox/checkbox';
import Details from '@/ui/details/details';
import Label from '@/ui/label/label';
import type { RegionsEnum } from '@/utils/Regions';
import { Regions } from '@/utils/Regions';

type Option = { value: RegionsEnum } & CheckboxProps;

const options: Option[][] = [[
  {
    children: Regions.ENGLAND.name,
    value: Regions.ENGLAND.id,
  },

  {
    children: Regions.SCOTLAND.name,
    value: Regions.SCOTLAND.id,
  },

  {
    children: Regions.WALES.name,
    value: Regions.WALES.id,
  },

  {
    children: Regions.NORTHERN_IRELAND.name,
    value: Regions.NORTHERN_IRELAND.id,
  },
], [
  {
    children: Regions.BRITISH_OVERSEAS_TERRITORIES.name,
    value: Regions.BRITISH_OVERSEAS_TERRITORIES.id,
  },
  {
    children: Regions.UK_AIRSPACE.name,
    value: Regions.UK_AIRSPACE.id,
  },
  {
    children: Regions.NAVAREA.name,
    value: Regions.NAVAREA.id,
  },
]];

type ReentryAlertAreasOfInterestProps = {
  selected: RegionsEnum[];
  onChange: (value: RegionsEnum[]) => void;
};

const ReentryAlertAreasOfInterest = ({ selected, onChange }: ReentryAlertAreasOfInterestProps) => {
  const t = useTranslations('OverflightMap.area_of_interest');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedSet = new Set(selected);
    const value = e.target.value as RegionsEnum;
    if (selectedSet.has(value)) {
      selectedSet.delete(value);
    } else {
      selectedSet.add(value);
    }
    onChange([...selectedSet]);
  };

  return (
    <div>
      <Label className="font-bold">{t('label')}</Label>
      <Details summary={t('help')}>
        <div className="grid grid-cols-2 gap-4">
          {options.map((group, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="govuk-checkboxes govuk-checkboxes--small">
              {group.map(({ value, children, ...props }) => <Checkbox key={value} value={value} checked={selected.includes(value)} onChange={handleChange} {...props}>{children}</Checkbox>)}
            </div>
          ))}
        </div>
      </Details>
    </div>
  );
};

export { ReentryAlertAreasOfInterest };
