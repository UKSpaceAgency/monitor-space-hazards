import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { getConjunctionEvent } from '@/actions/getConjunctionEvent';
import { getConjunctionEventsEventIdDataSources } from '@/actions/getConjunctionEventsEventIdDataSources';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import { ConjunctionEventHistoryTable } from './data-table/ConjunctionEventHistoryDataTable';

type ConjunctionEventHistoryProps = {
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  shortId: string;
};

const ConjunctionEventHistory = async ({ events, event, shortId }: ConjunctionEventHistoryProps) => {
  const t = await getTranslations('Conjunction.Event_history');

  const dataSources = await getConjunctionEventsEventIdDataSources({ eventId: shortId });

  const handleDownloadData = async () => {
    'use server';
    const event = await getConjunctionEvent({ eventId: shortId });

    return event;
  };

  return (
    <>
      <ConjunctionEventHistoryTable events={events} event={event} dataSources={dataSources} dataPdf={t('title')} />
      <DownloadData type={t('download')} params={{}} downloadAction={handleDownloadData} />
      <Details summary={t('help.title')}>
        {t.rich('help.content', {
          link: chunks => <Link href="/page/definitions#data_sources" className="govuk-link">{chunks}</Link>,
        }) }
      </Details>
    </>
  );
};

export { ConjunctionEventHistory };
