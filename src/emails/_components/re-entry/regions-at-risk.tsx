import type { TypeOverflightProbability, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { hasPositiveProbability } from '@/utils/ReentryRisk';
import { jsonRegionsMap, sortImpactByNation } from '@/utils/Regions';

import { Section } from '../section';
import { Table } from '../table';

type ReentryRegionsAtRiskProps = {
  report: TypeReentryEventReportOut;
};

const formatRegionNames = (
  impact: Record<string, TypeOverflightProbability> | undefined | null,
  options?: { sortNations?: boolean; excludeKeys?: string[] },
): string => {
  if (!impact || !Object.keys(impact).length) {
    return '';
  }

  const exclude = new Set(options?.excludeKeys ?? []);
  const entries = options?.sortNations
    ? sortImpactByNation(impact)
    : Object.entries(impact);

  const names = entries
    .filter(([key, data]) => !exclude.has(key) && hasPositiveProbability(data.atmospheric_probability))
    .map(([key]) => jsonRegionsMap[key] ?? key);

  return names.join(', ');
};

/** Summary of regions with re-entry-over probability > 0, grouped for the email. */
export const ReentryRegionsAtRisk = ({ report }: ReentryRegionsAtRiskProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Regions_at_risk' });

  const ukMainland = formatRegionNames(report.impact?.by_nation, {
    sortNations: true,
    excludeKeys: ['united_kingdom'],
  });
  const maritimeAndAirspace = formatRegionNames(report.impact?.maritime_and_airspace);
  const overseasTerritories = formatRegionNames(
    report.impact?.overseas_territories_and_crown_dependencies,
  );

  const data = [
    [t('uk_mainland'), ukMainland || t('no_regions_affected')],
    [t('overseas_territories_and_crown_dependencies'), overseasTerritories || t('no_regions_affected')],
    [t('maritime_and_airspace'), maritimeAndAirspace || t('no_regions_affected')],
  ];

  return (
    <Section title={t('title')}>
      <Table data={data} striped />
    </Section>
  );
};
