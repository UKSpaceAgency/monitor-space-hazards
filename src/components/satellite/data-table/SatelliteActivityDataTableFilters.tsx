'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import Select from '@/ui/select/select';

const FILTER_OPTIONS = [
  'All flags',
  'Position change',
  'Manoeuvre (unplanned)',
  'Manoeuvre (planned)',
  'Missing data',
];

type SatelliteActivityDataTableFiltersProps = {
  value: string;
  onChange: (value: string) => void;
};

const SatelliteActivityDataTableFilters = ({ value, onChange }: SatelliteActivityDataTableFiltersProps) => {
  const t = useTranslations('Tables.Activities.details');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div>
      <h4 className="govuk-heading-s mb-4">{t.rich('summary')}</h4>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center border-b border-midGrey pb-4 mb-4">
        <Select
          name="epoch"
          id="epoch"
          label={t('select_label')}
          value={value}
          options={FILTER_OPTIONS.map(option => ({
            children: option,
            value: option,
          }))}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export { SatelliteActivityDataTableFilters };
