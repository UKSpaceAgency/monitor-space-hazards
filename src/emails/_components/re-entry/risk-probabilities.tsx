import { Column, Row, Section } from '@react-email/components';
import { isNumber } from 'lodash';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { roundedFixed } from '@/utils/Math';

type ReentryRiskProbabilitiesProps = {
  event: TypeReentryEventOut;
} & ComponentProps<'table'>;

export const ReentryRiskProbabilities = ({ event, ...props }: ReentryRiskProbabilitiesProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Risk_probabilities' });

  const data = [{
    type: t('debris_impact'),
    probability: event.fragments_probability,
    risk: event.fragments_risk,
  }, {
    type: t('reentry_over_uk'),
    probability: event.atmospheric_probability,
    risk: event.atmospheric_risk,
  }];
  // }, {
  //   type: t('uk_casuality_risk'),
  //   probability: event.human_casualty_probability,
  //   risk: event.human_casualty_risk,
  // }];

  return (
    <Section {...props}>
      <Row
        className="text-sm !w-full"
      >
        <Column className="w-1/2 px-2 py-1">&nbsp;</Column>
        <Column className="font-bold w-1/2 px-2 py-1">{t('probability')}</Column>
        {/* <Column className="w-1/3 font-bold px-2 py-1">
            {t('risk')}
          </Column> */}
      </Row>
      {data.map(({ type, probability }) => {
        return (
          <Row
            key={type}
            className="text-sm !w-full"
          >
            <Column className="font-bold w-1/2 px-2 py-1">{type}</Column>
            <Column className="w-1/2 px-2 py-1">
              {isNumber(probability) ? `${roundedFixed(probability)}%` : 'Unknown'}
            </Column>
            {/* <Column style={{ backgroundColor: riskStyle.background, color: riskStyle.text }} className="w-1/3 px-2 py-1">{risk}</Column> */}
          </Row>
        );
      })}
    </Section>
  );
};
