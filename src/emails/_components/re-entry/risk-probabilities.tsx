import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
import { isNumber } from 'lodash';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { riskColours } from '@/emails/_utils/utils';
import messages from '@/locales/en.json';
import { roundedFixed } from '@/utils/Math';

type ReentryRiskProbabilitiesProps = {
  event: TypeReentryEventOut;
} & ComponentProps<'table'>;

export const ReentryRiskProbabilities = ({ event, ...props }: ReentryRiskProbabilitiesProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Risk_probabilities',
    messages,
  });

  const data = [{
    type: t('debris_impact'),
    probability: event.fragmentsProbability,
    risk: event.fragmentsRisk,
  }, {
    type: t('reentry_over_uk'),
    probability: event.humanCasualtyProbability,
    risk: event.humanCasualtyRisk,
  }, {
    type: t('uk_casuality_risk'),
    probability: event.humanCasualtyProbability,
    risk: event.humanCasualtyRisk,
  }];

  return (
    <Section {...props}>
      <Row
        className="text-sm"
      >
        <Column className="w-1/3 p-2">&nbsp;</Column>
        <Column className="font-bold text-center w-1/3 p-2">{t('probability')}</Column>
        <Column className="w-1/3 font-bold text-center p-2">
          {t('risk')}
        </Column>
      </Row>
      {data.map(({ type, probability, risk = 'Low' }, index) => {
        const riskStyle = riskColours[risk ?? 'Low'];

        return (
          <Row
            key={type}
            className={clsx('text-sm', {
              'bg-[#f0f0f0]': index % 2 === 0,
            })}
          >
            <Column className="font-bold w-1/3 p-2">{type}</Column>
            <Column className="w-1/3 text-center p-2">
              {isNumber(probability) ? roundedFixed(probability) : '-'}
            </Column>
            <Column style={{ backgroundColor: riskStyle.background, color: riskStyle.text }} className="w-1/3 text-center p-2">{risk}</Column>
          </Row>
        );
      })}
    </Section>
  );
};
