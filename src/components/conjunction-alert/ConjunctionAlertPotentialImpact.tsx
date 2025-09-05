import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertPotentialImpactProps = {
  immediateImpactAddition?: string | null;
  shortTermImpactAddition?: string | null;
  longTermImpactAddition?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertPotentialImpact = ({ immediateImpactAddition, shortTermImpactAddition, longTermImpactAddition, dataPdf }: ConjunctionAlertPotentialImpactProps) => {
  const t = useTranslations('Conjunction_alert.Potential_impact_of_event');

  return (
    <div data-pdf={dataPdf}>
      {immediateImpactAddition && (
        <div>
          <h4 className="govuk-heading-m">{t('immediate_impact.title')}</h4>
          <Markdown>{immediateImpactAddition}</Markdown>
        </div>
      )}
      {shortTermImpactAddition && (
        <div>
          <h4 className="govuk-heading-m">{t('short_term_impact.title')}</h4>
          <Markdown>{shortTermImpactAddition}</Markdown>
        </div>
      )}
      {longTermImpactAddition && (
        <div>
          <h4 className="govuk-heading-m">{t('long_term_impact.title')}</h4>
          <Markdown>{longTermImpactAddition}</Markdown>
        </div>
      )}
    </div>
  );
};

export { ConjunctionAlertPotentialImpact };
