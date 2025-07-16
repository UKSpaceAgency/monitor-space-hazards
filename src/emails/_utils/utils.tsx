import type { TypeReentryRisk } from '@/__generated__/data-contracts';
import { jsonRegionsMap } from '@/utils/Regions';

export const riskColours = {
  Low: {
    background: '#cce2d8',
    text: '#005a30',
  },
  Medium: {
    background: '#fcf7de',
    text: '#595000',
  },
  High: {
    background: '#f4ccc6',
    text: '#2a0a06',
  },
};

export const renderRiskTag = (risk: TypeReentryRisk | null | undefined) => risk
  ? (
      <span style={{ backgroundColor: riskColours[risk].background, color: riskColours[risk].text }}>
        {risk}
      </span>
    )
  : '-';

export const toAffectedTerritories = (value: Record<string, Record<string, any>> | undefined): string => {
  if (!value) {
    return 'No regions affected';
  }

  return Object.keys(value)
    .filter(k => value[k]?.atmospheric_probability > 0.0)
    .map(k => jsonRegionsMap[k])
    .join(', ');
};
