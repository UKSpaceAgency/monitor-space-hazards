import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';

import MissDistanceChart from '../charts/miss-distance-chart/MissDistanceChart';

type ConjunctionMissDistanceChartProps = {
  shortId: string;
  events: TypeEventSummaryOut[];
  isSpecial: boolean;
};

const ConjunctionMissDistanceChart = async ({ shortId, events, isSpecial }: ConjunctionMissDistanceChartProps) => {
  const t = await getTranslations('Conjunction.Miss_distance_chart');

  return (
    <div data-pdf={t('title')}>
      <MissDistanceChart data={events} isSpecial={isSpecial} />
      <Details summary={t.rich('help.title')} data-pdf-ignore>
        {t.rich('help.content', {
          link: chunks => <Link href={`/conjunctions/${shortId}#eventHistory`} className="govuk-link">{chunks}</Link>,
        })}
      </Details>
    </div>
  );
};

export { ConjunctionMissDistanceChart };
