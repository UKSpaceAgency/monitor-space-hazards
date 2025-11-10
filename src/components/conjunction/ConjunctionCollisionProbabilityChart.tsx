import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';

import PocChart from '../charts/poc-chart/PocChart';

type ConjunctionCollisionProbabilityChartProps = {
  shortId: string;
  events: TypeEventSummaryOut[];
};

const ConjunctionCollisionProbabilityChart = async ({ shortId, events }: ConjunctionCollisionProbabilityChartProps) => {
  const t = await getTranslations('Conjunction.Poc_chart');

  return (
    <>
      <PocChart
        data={events}
      />
      <Details summary={t.rich('help.title')} data-pdf-ignore>
        {t.rich('help.content', {
          link: chunks => <Link href={`/conjunctions/${shortId}#eventHistory`} className="govuk-link">{chunks}</Link>,
        })}
      </Details>
    </>
  );
};

export { ConjunctionCollisionProbabilityChart };
