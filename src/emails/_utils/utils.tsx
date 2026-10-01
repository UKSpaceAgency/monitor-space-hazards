import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeRisk } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Text } from '../_components/text';

// Matches the GOV.UK tag colours used on the website (see riskClasses in src/utils/Tags.tsx)
export const riskColours = {
  'No': {
    background: '#cecece',
    text: '#0b0c0c',
  },
  'None': {
    background: '#cecece',
    text: '#0b0c0c',
  },
  'Pending': {
    background: '#d2e2f1',
    text: '#0f385c',
  },
  'Very low': {
    background: '#cecece',
    text: '#0b0c0c',
  },
  'Low': {
    background: '#cfe4dc',
    text: '#083d29',
  },
  'Medium': {
    background: '#ffee80',
    text: '#7a3c1c',
  },
  'High': {
    background: '#f4d7d7',
    text: '#651b1b',
  },
  'Very high': {
    background: '#f4d7d7',
    text: '#651b1b',
  },
};

export const renderRiskTag = (risk: TypeRisk | null | undefined) => risk
  ? (
      <span style={{ backgroundColor: riskColours[risk].background, color: riskColours[risk].text }}>
        {risk}
      </span>
    )
  : '-';

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
