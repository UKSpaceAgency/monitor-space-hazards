import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';

import { Markdown } from '../Markdown';

type ConjunctionAlertPotentialImpactProps = {
  report: TypeConjunctionReportOut;
  immediateImpactAddition?: string | null;
  shortTermImpactAddition?: string | null;
  longTermImpactAddition?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertPotentialImpact = ({ report, immediateImpactAddition, shortTermImpactAddition, longTermImpactAddition, dataPdf }: ConjunctionAlertPotentialImpactProps) => {
  const t = useTranslations('Conjunction_alert.Potential_impact_of_event');

  return (
    <div data-pdf={dataPdf}>
      <div>
        <h4 className="govuk-heading-m">{t('immediate_impact.title')}</h4>
        {immediateImpactAddition
          ? <Markdown>{immediateImpactAddition}</Markdown>
          : t.rich('immediate_impact.content', {
              predictedFragments: report.predictedFragments,
            })}
      </div>
      <div>
        <h4 className="govuk-heading-m">{t('short_term_impact.title')}</h4>
        {shortTermImpactAddition
          ? <Markdown>{shortTermImpactAddition}</Markdown>
          : t.rich('short_term_impact.content', {
              increaseInFutureCollisions: report.increaseInFutureCollisions,
            })}
      </div>
      <div>
        <h4 className="govuk-heading-m">{t('long_term_impact.title')}</h4>
        {longTermImpactAddition
          ? <Markdown>{longTermImpactAddition}</Markdown>
          : t.rich('long_term_impact.content', {
              altitude: report.altitude,
            })}
      </div>
    </div>
  );
};

export { ConjunctionAlertPotentialImpact };
