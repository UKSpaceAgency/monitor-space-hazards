import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertPotentialImpactProps = {
  immediateImpactAddition?: string | null;
  shortTermImpactAddition?: string | null;
  longTermImpactAddition?: string | null;
};

const ConjunctionAlertPotentialImpact = ({ immediateImpactAddition, shortTermImpactAddition, longTermImpactAddition }: ConjunctionAlertPotentialImpactProps) => {
  const t = useTranslations('Conjunction_alert.Potential_impact_of_event');

  return (
    <div>
      <div>
        <h4 className="govuk-heading-m">{t('immediate_impact.title')}</h4>
        {t.rich('immediate_impact.content')}
        <Markdown>{immediateImpactAddition}</Markdown>
      </div>
      <div>
        <h4 className="govuk-heading-m">{t('short_term_impact.title')}</h4>
        {t.rich('short_term_impact.content')}
        <Markdown>{shortTermImpactAddition}</Markdown>
      </div>
      <div>
        <h4 className="govuk-heading-m">{t('long_term_impact.title')}</h4>
        {t.rich('long_term_impact.content')}
        <Markdown>{longTermImpactAddition}</Markdown>
      </div>
    </div>
  );
};

export { ConjunctionAlertPotentialImpact };
