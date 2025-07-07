import type { ComponentProps } from 'react';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { toAffectedTerritories } from '@/emails/_utils/utils';

import { Table } from '../table';

type AffectedRegionsProps = {
  report: TypeReentryEventReportOut;
} & ComponentProps<'table'>;

export const AffectedRegions = ({ report, ...props }: AffectedRegionsProps) => {
  const data = [
    ['UK Mainland', toAffectedTerritories(report.impact?.by_nation)],
    ['Airspace and Maritime', toAffectedTerritories(report.impact?.maritime_and_airspace)],
    ['UK Overseas Territories and Crown Dependencies', toAffectedTerritories(report.impact?.overseas_territories_and_crown_dependencies)],
  ];
  return <Table data={data} {...props} />;
};
