import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Markdown } from '../markdown';
import { Text } from '../text';

type ConjunctionPotentialImpactProps = {
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
};

export const ConjunctionPotentialImpact = ({ report, event }: ConjunctionPotentialImpactProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Potential_impact_of_event',
    messages,
  });

  return (
    <Section>
      <Text className="m-0 font-bold">{t('immediate_impact.title')}</Text>
      {t.rich('immediate_impact.content', {
        predictedFragments: report.predictedFragments,
        p: chunks => <Text>{chunks}</Text>,
      })}
      {event.immediateImpactAddition && <Markdown>{event.immediateImpactAddition}</Markdown>}
      <Text className="m-0 font-bold">{t('short_term_impact.title')}</Text>
      {t.rich('short_term_impact.content', {
        increaseInFutureCollisions: report.increaseInFutureCollisions,
        p: chunks => <Text>{chunks}</Text>,
      })}
      {event.shortTermImpactAddition && <Markdown>{event.shortTermImpactAddition}</Markdown>}
      <Text className="m-0 font-bold">{t('long_term_impact.title')}</Text>
      {t.rich('long_term_impact.content', {
        altitude: report.altitude,
        p: chunks => <Text>{chunks}</Text>,
      })}
      {event.longTermImpactAddition && <Markdown>{event.longTermImpactAddition}</Markdown>}
    </Section>
  );
};
