'use client';

import type { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import Checkboxes from '@/ui/checkboxes/checkboxes';
import { Regions, RegionsEnum } from '@/utils/Regions';

type RegionsTableProps = {
  name: string;
  legend: string;
};

export function RegionsTable({ name, legend }: RegionsTableProps) {
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
    <Checkboxes
      name={name}
      legend={legend}
      items={[
        {
          id: `${name}_anywhere`,
          children: Regions.ANYWHERE.name,
          value: RegionsEnum.ANYWHERE,
          checked: ukRegions.every(region => values.includes(region)),
          onChange: onToggleUKRegions,
        },
        {
          id: `${name}_england`,
          children: Regions.ENGLAND.name,
          value: RegionsEnum.ENGLAND,
          className: 'ml-10',
          checked: values.includes(RegionsEnum.ENGLAND),
          onChange,
        },
        {
          id: `${name}_northern_ireland`,
          children: Regions.NORTHERN_IRELAND.name,
          value: RegionsEnum.NORTHERN_IRELAND,
          className: 'ml-10',
          checked: values.includes(RegionsEnum.NORTHERN_IRELAND),
          onChange,
        },
        {
          id: `${name}_scotland`,
          children: Regions.SCOTLAND.name,
          value: RegionsEnum.SCOTLAND,
          className: 'ml-10',
          checked: values.includes(RegionsEnum.SCOTLAND),
          onChange,
        },
        {
          id: `${name}_wales`,
          children: Regions.WALES.name,
          value: RegionsEnum.WALES,
          className: 'ml-10',
          checked: values.includes(RegionsEnum.WALES),
          onChange,
        },
        {
          id: `${name}_british_overseas_territories`,
          children: Regions.BRITISH_OVERSEAS_TERRITORIES.name,
          value: RegionsEnum.BRITISH_OVERSEAS_TERRITORIES,
          checked: values.includes(RegionsEnum.BRITISH_OVERSEAS_TERRITORIES),
          onChange,
        },
        {
          id: `${name}_shanwick`,
          children: Regions.SHANWICK.name,
          value: RegionsEnum.SHANWICK,
          checked: values.includes(RegionsEnum.SHANWICK),
          onChange,
        },
        {
          id: `${name}_london_fir`,
          children: Regions.LONDON_FIR.name,
          value: RegionsEnum.LONDON_FIR,
          checked: values.includes(RegionsEnum.LONDON_FIR),
          onChange,
        },
        {
          id: `${name}_scotland_fir`,
          children: Regions.SCOTLAND_FIR.name,
          value: RegionsEnum.SCOTLAND_FIR,
          checked: values.includes(RegionsEnum.SCOTLAND_FIR),
          onChange,
        },
        {
          id: `${name}_navarea`,
          children: Regions.NAVAREA.name,
          value: RegionsEnum.NAVAREA,
          checked: values.includes(RegionsEnum.NAVAREA),
          onChange,
        },
        {
          id: `${name}_rest_of_the_world`,
          children: Regions.REST_OF_THE_WORLD.name,
          value: RegionsEnum.REST_OF_THE_WORLD,
          checked: values.includes(RegionsEnum.REST_OF_THE_WORLD),
          onChange,
        },
      ]}
    />
  );
}
