import { isNumber } from 'lodash';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator, objectTypeIndex } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

import { Table } from '../table';

type ReentryEventSummaryTableProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
} & ComponentProps<'table'>;

const UNKNOWN = 'Unknown';

const withUnit = (value: number | null | undefined, unit: string) =>
  isNumber(value) ? `${value} ${unit}` : UNKNOWN;

export const ReentryEventSummaryTable = ({ event, report, ...props }: ReentryEventSummaryTableProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Event_summary' });

  const objectName = report.object_name ?? event.object_name ?? UNKNOWN;
  const objectType = report.object_type ?? event.object_type;
  const objectTypeLabel = objectType
    ? objectTypeIndex[objectType as keyof typeof objectTypeIndex] ?? objectType
    : null;

  const decayEpoch = report.decay_epoch ?? event.decay_epoch;
  const uncertaintyWindow = report.uncertainty_window ?? event.uncertainty_window;
  const survivability = report.survivability ?? event.survivability;
  const survivabilityComment = report.survivability_comment ?? event.survivability_comment;

  const data = [
    [
      t('predicted_re_entry_time'),
      decayEpoch ? dayjs.utc(decayEpoch).format(FORMAT_FULL_DATE_TIME) : UNKNOWN,
    ],
    [
      t('uncertainty_window'),
      isNumber(uncertaintyWindow) ? `+/- ${uncertaintyWindow} minutes` : UNKNOWN,
    ],
    [t('object'), objectTypeLabel ? `${objectName} (${objectTypeLabel})` : objectName],
    [t('norad_id'), report.norad_id ?? event.norad_id],
    [t('estimated_mass'), withUnit(report.estimated_mass ?? event.estimated_mass, 'kg')],
    [t('height'), withUnit(report.object_height ?? event.object_height, 'm')],
    [t('width'), withUnit(report.object_width ?? event.object_width, 'm')],
    [
      t('licensing_country'),
      getFullCountry(report.licensing_country ?? event.license_country ?? event.licensed_country),
    ],
    [
      t('expected_survivability'),
      [survivability ? `${survivability}.` : null, survivabilityComment]
        .filter(Boolean)
        .join(' ') || UNKNOWN,
    ],
    [t('report_number'), report.report_number],
  ];

  return <Table data={data} forceAlignLeft {...props} />;
};
