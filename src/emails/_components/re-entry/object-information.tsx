import { isNumber } from 'lodash';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { getFullCountry } from '@/utils/Regions';

import { Table } from '../table';

type ReentryObjectInformationProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
} & ComponentProps<'table'>;

const UNKNOWN = 'Unknown';

const withUnit = (value: number | null | undefined, unit: string) =>
  isNumber(value) ? `${value} ${unit}` : UNKNOWN;

export const ReentryObjectInformation = ({ event, report, ...props }: ReentryObjectInformationProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Event_summary' });

  const data = [
    [t('norad_id'), report.norad_id ?? event.norad_id ?? UNKNOWN],
    [t('estimated_mass'), withUnit(report.estimated_mass ?? event.estimated_mass, 'kg')],
    [t('height'), withUnit(report.object_height ?? event.object_height, 'm')],
    [t('width'), withUnit(report.object_width ?? event.object_width, 'm')],
    [
      t('licensing_country'),
      getFullCountry(report.licensing_country ?? event.license_country ?? event.licensed_country),
    ],
  ];

  return <Table data={data} forceAlignLeft {...props} />;
};
