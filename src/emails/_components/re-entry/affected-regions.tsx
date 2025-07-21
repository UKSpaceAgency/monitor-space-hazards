import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { toAffectedTerritories } from '@/emails/_utils/utils';
import messages from '@/locales/en.json';

import { Table } from '../table';

type ReentryAffectedRegionsProps = {
  report: TypeReentryEventReportOut;
} & ComponentProps<'table'>;

export const ReentryAffectedRegions = ({ report, ...props }: ReentryAffectedRegionsProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Affected_regions',
    messages,
  });

  const data = [
    [t('uk_mainland'), report.impact?.by_nation?.length ? toAffectedTerritories(report.impact?.by_nation) : t('no_regions_affected')],
    [t('maritime_and_airspace'), report.impact?.maritime_and_airspace?.length ? toAffectedTerritories(report.impact?.maritime_and_airspace) : t('no_regions_affected')],
    [t('overseas_territories_and_crown_dependencies'), report.impact?.overseas_territories_and_crown_dependencies?.length ? toAffectedTerritories(report.impact?.overseas_territories_and_crown_dependencies) : t('no_regions_affected')],
  ];
  return <Table data={data} {...props} />;
};
