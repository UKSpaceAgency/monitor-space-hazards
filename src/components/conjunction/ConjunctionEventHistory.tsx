import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import { ConjunctionEventHistoryTable } from './data-table/ConjunctionEventHistoryDataTable';

type ConjunctionEventHistoryProps = {
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  dataSources: TypeDataSourcesOut;
  handleDownloadData: (params: object) => Promise<unknown>;
};

const ConjunctionEventHistory = async ({ events, event, dataSources, handleDownloadData }: ConjunctionEventHistoryProps) => {
  const t = await getTranslations('Conjunction.Event_history');
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
