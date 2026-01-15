'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ChangeEvent, HTMLProps } from 'react';
import { useMemo, useState } from 'react';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { roundedPercent } from '@/utils/Math';
import { jsonRegionsMap } from '@/utils/Regions';

// Types
type ReentryAlertImpactTableProps = {
  caption?: string;
  impact: Record<string, TypeOverflightProbability>;
  byRegion: string;
  isNation?: boolean;
};

type ProbabilityType = 'fragments_probability' | 'atmospheric_probability' | 'human_casualty_probability';

type HeaderConfig = HTMLProps<HTMLTableCellElement> & {
  id: string;
  children: React.ReactNode;
};

// Constants
const ALL_PROBABILITY_TYPES: ProbabilityType[] = [
  'fragments_probability',
  'atmospheric_probability',
  // 'human_casualty_probability',
];

const ALL_OVERFLIGHTS_OPTION = 0;

// Helper functions
const formatProbability = (value: number | null | undefined): string => {
  return value ? `${roundedPercent(value)}` : '-';
};

const formatOverflightTime = (overflightTime: string[] | null | undefined, index: number): string => {
  return overflightTime && overflightTime[index]
    ? dayjs(overflightTime[index]).format(FORMAT_DATE_TIME)
    : '-';
};

const getRegionDisplayName = (key: string): string => {
  return jsonRegionsMap[key] ?? key;
};

const ReentryAlertImpactTable = ({ caption, impact, byRegion, isNation }: ReentryAlertImpactTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  // State
  const [selectedProbabilityTypes, setSelectedProbabilityTypes] = useState<ProbabilityType[]>(ALL_PROBABILITY_TYPES);
  const [selectedOverflightIndex, setSelectedOverflightIndex] = useState<number>(ALL_OVERFLIGHTS_OPTION);

  // Computed values
  const maxOverflightCount = useMemo(() => {
    if (!impact) {
      return 0;
    }

    return Object.values(impact).reduce((maxCount, value) => {
      const overflightCount = value.overflight_time?.length || 0;
      return Math.max(maxCount, overflightCount);
    }, 0);
  }, [impact]);

  // Event handlers
  const handleOverflightChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOverflightIndex(Number(e.currentTarget.value));
  };

  const handleProbabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const probabilityType = e.currentTarget.value as ProbabilityType;
    setSelectedProbabilityTypes(prev =>
      prev.includes(probabilityType)
        ? prev.filter(type => type !== probabilityType)
        : [...prev, probabilityType],
    );
  };

  // Header configuration
  const tableHeaders = useMemo((): HeaderConfig[] => {
    const probabilityHeaders: HeaderConfig[] = [
      {
        id: 'fragments_probability',
        children: t('probability_of_fragmentation'),
      },
      {
        id: 'atmospheric_probability',
        children: isNation ? t('probability_of_atmospheric_entry_nation') : t('probability_of_atmospheric_entry'),
      },
      // {
      //   id: 'human_casualty_probability',
      //   children: t('probability_of_human_casualty'),
      // },
    ];

    const overflightHeaders: HeaderConfig[] = Array.from(
      { length: maxOverflightCount },
      (_, index) => ({
        id: `overflight_${index + 1}`,
        children: t('time_of_overflight', { number: index + 1 }),
      }),
    );

    return [...probabilityHeaders, ...overflightHeaders];
  }, [t, maxOverflightCount]);

  // Filter visible headers
  const visibleHeaders = useMemo(() => {
    return tableHeaders.filter((header) => {
      if (header.id.includes('probability')) {
        return selectedProbabilityTypes.includes(header.id as ProbabilityType);
      }
      if (header.id.includes('overflight')) {
        const overflightNumber = Number(header.id.split('_')[1]);
        return selectedOverflightIndex === ALL_OVERFLIGHTS_OPTION || selectedOverflightIndex === overflightNumber;
      }
      return true;
    });
  }, [tableHeaders, selectedProbabilityTypes, selectedOverflightIndex]);

  // Render probability cell
  const renderProbabilityCell = (value: TypeOverflightProbability, probabilityType: ProbabilityType) => {
    if (!selectedProbabilityTypes.includes(probabilityType)) {
      return null;
    }

    return (
      <TableCell key={probabilityType}>
        {formatProbability(value[probabilityType])}
      </TableCell>
    );
  };

  // Render overflight cells
  const renderOverflightCells = (value: TypeOverflightProbability, regionKey: string) => {
    if (selectedOverflightIndex === ALL_OVERFLIGHTS_OPTION) {
      return Array.from({ length: maxOverflightCount }, (_, index) => (
        <TableCell key={`${regionKey}-overflight-${index}`}>
          {formatOverflightTime(value.overflight_time, index)}
        </TableCell>
      ));
    }

    return (
      <TableCell>
        {formatOverflightTime(value.overflight_time, selectedOverflightIndex - 1)}
      </TableCell>
    );
  };

  // Select options
  const overflightOptions = useMemo(() => [
    { children: 'All', value: ALL_OVERFLIGHTS_OPTION },
    ...Array.from({ length: maxOverflightCount }, (_, index) => ({
      children: `Overflight ${index + 1}`,
      value: index + 1,
    })),
  ], [maxOverflightCount]);

  const probabilityCheckboxItems = useMemo(() =>
    tableHeaders
      .filter(header => header.id.includes('probability'))
      .map(header => ({
        children: header.children,
        value: header.id,
        checked: selectedProbabilityTypes.includes(header.id as ProbabilityType),
      })), [tableHeaders, selectedProbabilityTypes]);

  return (
    <div>
      {caption && (
        <h4 className="govuk-heading-m">
          {caption}
        </h4>
      )}
      <Details summary={t.rich('details.summary')} summaryAriaLabel={`Toggle risk probabilities and overflights - ${byRegion}`}>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex-1">
            <Checkboxes
              className="mb-0"
              smaller
              items={probabilityCheckboxItems}
              onChange={handleProbabilityChange}
            >
              {byRegion && (
                <legend className="sr-only">
                  Toggle
                  {' '}
                  {byRegion}
                </legend>
              )}
            </Checkboxes>
          </div>
          <div className="flex items-end gap-2">
            <Select
              label={(
                <b>
                  {t('choose_overflight')}
                  <span className="sr-only">{` - Potential impact by ${byRegion}`}</span>
                </b>
              )}
              options={overflightOptions}
              onChange={handleOverflightChange}
            />
          </div>
        </div>
      </Details>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {visibleHeaders.map((header, index) => (
                <TableCellHeader key={`${header.id}-${index}`} {...header} />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(impact).map(([regionKey, value]) => (
              <TableRow key={regionKey}>
                <TableCellHeader className={clsx('w-6/12')}>
                  {getRegionDisplayName(regionKey)}
                </TableCellHeader>

                {renderProbabilityCell(value, 'fragments_probability')}
                {renderProbabilityCell(value, 'atmospheric_probability')}
                {/* {renderProbabilityCell(value, 'human_casualty_probability')} */}

                {renderOverflightCells(value, regionKey)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { ReentryAlertImpactTable };
