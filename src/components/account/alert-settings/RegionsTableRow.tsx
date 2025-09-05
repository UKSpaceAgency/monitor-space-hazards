'use client';
import type { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import Checkboxes from '@/ui/checkboxes/checkboxes';
import type { Region } from '@/utils/Regions';
import { Regions, RegionsEnum } from '@/utils/Regions';

type RegionsTableProps = {
  name: string;
};

export function RegionsTable({ name }: RegionsTableProps) {
  return (
    <table className="govuk-table">
      <tbody className="govuk-table__body">
        <RegionsTableRow region={Regions.ANYWHERE} name={name} toggleRegions />
        <RegionsTableRow region={Regions.ENGLAND} name={name} intent />
        <RegionsTableRow region={Regions.NORTHERN_IRELAND} name={name} intent />
        <RegionsTableRow region={Regions.SCOTLAND} name={name} intent />
        <RegionsTableRow region={Regions.WALES} name={name} intent />
        <RegionsTableRow region={Regions.BRITISH_OVERSEAS_TERRITORIES} name={name} />
        <RegionsTableRow region={Regions.SHANWICK} name={name} />
        <RegionsTableRow region={Regions.LONDON_FIR} name={name} />
        <RegionsTableRow region={Regions.SCOTLAND_FIR} name={name} />
        <RegionsTableRow region={Regions.NAVAREA} name={name} />
        <RegionsTableRow region={Regions.REST_OF_THE_WORLD} name={name} />
      </tbody>
    </table>
  );
}

function RegionsTableRow({
  region,
  name,
  toggleRegions,
  intent,
}: {
  region: Region;
  name: string;
  toggleRegions?: boolean;
  intent?: true;
}) {
  const { setValue, watch } = useFormContext();

  const ukRegions = [
    RegionsEnum.ENGLAND,
    RegionsEnum.NORTHERN_IRELAND,
    RegionsEnum.SCOTLAND,
    RegionsEnum.WALES,
  ];

  const values: Array<RegionsEnum> = watch(name) || [];

  const onToggleUKRegions = () => {
    setValue(
      name,
      ukRegions.every(region => values.includes(region))
        ? values.filter(value => !ukRegions.includes(value))
        : [...values, ...ukRegions],
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as RegionsEnum;
    setValue(
      name,
      values.includes(value)
        ? values.filter(val => val !== value)
        : [...values, value],
    );
  };

  return (
    <tr className="govuk-table__row">
      <td
        className="govuk-table__cell"
        style={intent ? { textIndent: '40px' } : {}}
      >
        <label htmlFor={region.id}>{region.name}</label>
      </td>
      <td className="govuk-table__cell">
        <div className="h-11">
          <Checkboxes
            items={[{
              id: region.id,
              name: region.id,
              value: region.id,
              checked: toggleRegions
                ? ukRegions.every(region => values.includes(region))
                : values.includes(region.id),
              children: '',
              onChange: toggleRegions ? onToggleUKRegions : onChange,
            },
            ]}
          />
        </div>
      </td>
    </tr>
  );
}
