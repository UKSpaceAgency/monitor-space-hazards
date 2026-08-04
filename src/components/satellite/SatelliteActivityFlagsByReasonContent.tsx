'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import ActivityFlagsByReasonChart from '@/components/charts/activity-flags-by-reason/ActivityFlagsByReason';
import { chartPalette } from '@/components/charts/base/theme';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';
import type { TranslatedColumnDef } from '@/types';
import Select from '@/ui/select/select';

const REASONS = [
  { key: 'planned', match: 'Manoeuvre (planned)', labelKey: 'manoeuvre_planned', color: chartPalette.nspocBlue },
  { key: 'unplanned', match: 'Manoeuvre (unplanned)', labelKey: 'manoeuvre_unplanned', color: chartPalette.nspocRed },
  { key: 'positionChange', match: 'Position change', labelKey: 'position_change', color: chartPalette.nspocYellow },
  { key: 'missingData', match: 'Missing data', labelKey: 'missing_data', color: chartPalette.nspocGreen },
] as const;

type ReasonCounts = {
  positionChange: number;
  planned: number;
  unplanned: number;
  missingData: number;
};

type YearRow = ReasonCounts & {
  year: string;
  total: number;
};

const countByReason = (events: TypeActivityEvent[]): ReasonCounts => ({
  positionChange: events.filter(e => e.reason_for_flag === 'Position change').length,
  planned: events.filter(e => e.reason_for_flag === 'Manoeuvre (planned)').length,
  unplanned: events.filter(e => e.reason_for_flag === 'Manoeuvre (unplanned)').length,
  missingData: events.filter(e => e.reason_for_flag === 'Missing data' || e.reason_for_flag == null).length,
});

const tableColumns: TranslatedColumnDef<YearRow>[] = [
  { accessorKey: 'year', id: 'year', header: 'Activity_flags_by_reason.year', enableSorting: false },
  { accessorKey: 'planned', id: 'planned', header: 'Activity_flags_by_reason.manoeuvre_planned', enableSorting: false },
  { accessorKey: 'unplanned', id: 'unplanned', header: 'Activity_flags_by_reason.manoeuvre_unplanned', enableSorting: false },
  { accessorKey: 'positionChange', id: 'positionChange', header: 'Activity_flags_by_reason.position_change', enableSorting: false },
  { accessorKey: 'missingData', id: 'missingData', header: 'Activity_flags_by_reason.missing_data', enableSorting: false },
  { accessorKey: 'total', id: 'total', header: 'Activity_flags_by_reason.total', enableSorting: false },
];

type SatelliteActivityFlagsByReasonContentProps = {
  initialData: TypeActivityEvent[];
};

const SatelliteActivityFlagsByReasonContent = ({ initialData }: SatelliteActivityFlagsByReasonContentProps) => {
  const t = useTranslations('Charts.Activity_flags_by_reason');
  const [selectedYear, setSelectedYear] = useState('all');

  const years = useMemo(
    () => Array.from(new Set(initialData.map(e => e.year))).sort((a, b) => b - a),
    [initialData],
  );

  const chartData = useMemo(() => {
    const events = selectedYear === 'all'
      ? initialData
      : initialData.filter(e => String(e.year) === selectedYear);
    const counts = countByReason(events);
    return REASONS.map(({ key, labelKey, color }) => ({
      reason: t(labelKey),
      count: counts[key],
      color,
    }));
  }, [initialData, selectedYear, t]);

  const rows: YearRow[] = useMemo(
    () => years.map((year) => {
      const events = initialData.filter(e => e.year === year);
      return {
        year: String(year),
        ...countByReason(events),
        total: events.length,
      };
    }),
    [initialData, years],
  );

  const yearFilter = (
    <Select
      name="activity-flags-by-reason-year"
      id="activity-flags-by-reason-year"
      label={t('year_filter')}
      value={selectedYear}
      options={[
        { children: t('all_years'), value: 'all' },
        ...years.map(year => ({ children: String(year), value: String(year) })),
      ]}
      onChange={e => setSelectedYear(e.target.value)}
    />
  );

  return (
    <div>
      <p className="govuk-body">{t('description')}</p>
      <div className="mb-4">
        <ActivityFlagsByReasonChart data={chartData} actionButtons={yearFilter} />
      </div>
      <Scrollable>
        <DataTable
          columns={tableColumns}
          data={rows}
          enableSorting={false}
          ariaLabel="Information on activity flags by reason for flag"
          emptyLabel="No activity flags found."
        />
      </Scrollable>
    </div>
  );
};

export { SatelliteActivityFlagsByReasonContent };
