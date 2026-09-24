import type { ComponentProps } from 'react';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator, toAffectedTerritories } from '@/emails/_utils/utils';
import { hasPositiveProbability } from '@/utils/ReentryRisk';

import { Table } from '../table';

type ReentryAffectedRegionsProps = {
  report: TypeReentryEventReportOut;
} & ComponentProps<'table'>;

export const ReentryAffectedRegions = ({ report, ...props }: ReentryAffectedRegionsProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Affected_regions' });

  // UK-wide figures outside the impact array; include when any probability > 0%
  const ukAtRisk = hasPositiveProbability(
    report.fragments_probability,
    report.atmospheric_probability,
    report.human_casualty_probability,
  );

  const data = [
    [t('uk_mainland'), ukAtRisk ? t('united_kingdom') : t('no_regions_affected')],
    [t('overseas_territories_and_crown_dependencies'), report.impact?.overseas_territories_and_crown_dependencies ? toAffectedTerritories(report.impact?.overseas_territories_and_crown_dependencies) : t('no_regions_affected')],
  ];
  return <Table data={data} {...props} />;
};
