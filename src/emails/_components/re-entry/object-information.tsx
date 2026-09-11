import { isNumber } from 'lodash';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { getFullCountry } from '@/utils/Regions';

import { Table } from '../table';

type ReentryObjectInformationProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  /** Appends expected survivability and report number (used by the alert email). */
  withSurvivabilityAndReportNumber?: boolean;
} & ComponentProps<'table'>;

const UNKNOWN = 'Unknown';

const withUnit = (value: number | null | undefined, unit: string) =>
  isNumber(value) ? `${value} ${unit}` : UNKNOWN;

export const ReentryObjectInformation = ({
  event,
  report,
  withSurvivabilityAndReportNumber = false,
  ...props
}: ReentryObjectInformationProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Event_summary' });

  const survivability = report.survivability ?? event.survivability;
  const survivabilityComment = report.survivability_comment ?? event.survivability_comment;

  const data = [
    [t('norad_id'), report.norad_id ?? event.norad_id ?? UNKNOWN],
    [t('estimated_mass'), withUnit(report.estimated_mass ?? event.estimated_mass, 'kg')],
    [t('height'), withUnit(report.object_height ?? event.object_height, 'm')],
    [t('width'), withUnit(report.object_width ?? event.object_width, 'm')],
    [
      t('licensing_country'),
      getFullCountry(report.licensing_country ?? event.license_country ?? event.licensed_country),
    ],
    ...(withSurvivabilityAndReportNumber
      ? [
          [
            t('expected_survivability'),
            [survivability ? `${survivability}.` : null, survivabilityComment].filter(Boolean).join(' ') || UNKNOWN,
          ],
          [t('report_number'), report.report_number ?? UNKNOWN],
        ]
      : []),
  ];

  return <Table data={data} forceAlignLeft {...props} />;
};
