import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Details from '@/ui/details/details';

import RichText from '../RichText';

type ConjunctionCollisionProbabilityChartProps = {
  id: string;
};

const ConjunctionCollisionProbabilityChart = ({ id }: ConjunctionCollisionProbabilityChartProps) => {
  const t = useTranslations('Accordions.Conjunction.poc_chart');

  return (
    <div data-pdf={t('title')}>
      <Details summary={t('help.title')} data-pdf-ignore>
        <RichText>
          {tags => t.rich('help.content', {
            ...tags,
            link: chunks => <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">{chunks}</Link>,
          }) }
        </RichText>
      </Details>
    </div>
  );
};

export { ConjunctionCollisionProbabilityChart };
