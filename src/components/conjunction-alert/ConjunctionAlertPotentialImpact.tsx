import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertPotentialImpactProps = {
  immediateImpactComment?: string | null;
  shortTermImpactComment?: string | null;
  longTermImpactComment?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertPotentialImpact = ({ immediateImpactComment, shortTermImpactComment, longTermImpactComment, dataPdf }: ConjunctionAlertPotentialImpactProps) => {
  const t = useTranslations('Conjunction_alert.Potential_impact_of_event');

  return (
    <div data-pdf={dataPdf}>
      {immediateImpactComment && (
        <div>
          <h4 className="govuk-heading-m">{t('immediate_impact.title')}</h4>
          <Markdown>{immediateImpactComment}</Markdown>
        </div>
      )}
      {shortTermImpactComment && (
        <div>
          <h4 className="govuk-heading-m">{t('short_term_impact.title')}</h4>
          <Markdown>{shortTermImpactComment}</Markdown>
        </div>
      )}
      {longTermImpactComment && (
        <div>
          <h4 className="govuk-heading-m">{t('long_term_impact.title')}</h4>
          <Markdown>{longTermImpactComment}</Markdown>
        </div>
      )}
    </div>
  );
};

export { ConjunctionAlertPotentialImpact };
