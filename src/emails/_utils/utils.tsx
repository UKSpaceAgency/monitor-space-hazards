import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeRisk } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';
import { jsonRegionsMap } from '@/utils/Regions';

import { Text } from '../_components/text';

export const riskColours = {
  'No': {
    background: '#cce2d8',
    text: '#005a30',
  },
  'None': {
    background: '#cce2d8',
    text: '#005a30',
  },
  'Pending': {
    background: '#cce2d8',
    text: '#005a30',
  },
  'Very low': {
    background: '#cce2d8',
    text: '#005a30',
  },
  'Low': {
    background: '#cce2d8',
    text: '#005a30',
  },
  'Medium': {
    background: '#fcf7de',
    text: '#595000',
  },
  'High': {
    background: '#f4ccc6',
    text: '#2a0a06',
  },
  'Very high': {
    background: '#f4ccc6',
    text: '#2a0a06',
  },
};

export const renderRiskTag = (risk: TypeRisk | null | undefined) => risk
  ? (
      <span style={{ backgroundColor: riskColours[risk].background, color: riskColours[risk].text }}>
        {risk}
      </span>
    )
  : '-';

export const toAffectedTerritories = (value: Record<string, Record<string, any>> | undefined): string => {
  if (!value || !Object.keys(value).length) {
    return 'No regions affected';
  }

  const regions = Object.keys(value)
    .filter(k => value[k]?.fragments_probability > 0)
    .map(k => jsonRegionsMap[k]);

  return regions.length > 0 ? regions.join(', ') : 'No regions affected';
};

export const objectTypeIndex = {
  'PAYLOAD': 'Satellite',
  'ROCKET BODY': 'Rocket Body',
  'DEBRIS': 'Debris',
  'UNKNOWN': 'Unknown Object Type',
  'R/B': 'Rocket Body',
};

export const defaultTranslationValues: RichTranslationValues = {
  h3: chunks => <h3 className="govuk-heading-m">{chunks}</h3>,
  p: chunks => <Text>{chunks}</Text>,
  list: chunks => <ul className="list-disc pl-4">{chunks}</ul>,
  item: chunks => <li className="text-sm">{chunks}</li>,
  bold: chunks => <b>{chunks}</b>,
  b: chunks => <b>{chunks}</b>,
};

export function createEmailTranslator<NestedKey extends Parameters<typeof createTranslator>[0]['namespace']>({ namespace }: { namespace: NestedKey }) {
  const translator = createTranslator({
    locale: 'en',
    namespace,
    messages,
  });

  const originalRich = translator.rich.bind(translator);
  translator.rich = ((key: any, values?: RichTranslationValues) => {
    return originalRich(key, { ...defaultTranslationValues, ...values });
  }) as typeof translator.rich;

  return translator;
}
