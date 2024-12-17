import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import RichText from '../RichText';
import { ConjunctionEventHistoryTable } from './tables/ConjunctionEventHistoryTable';

type ConjunctionEventHistoryProps = {
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  dataSources: TypeDataSourcesOut;
  handleDownloadData: (params: object) => Promise<unknown>;
};

const ConjunctionEventHistory = ({ events, event, dataSources, handleDownloadData }: ConjunctionEventHistoryProps) => {
  const t = useTranslations('Conjunction.Event_history');
  return (
    <>
      <div data-pdf={t('title')}>
        <ConjunctionEventHistoryTable events={events} event={event} dataSources={dataSources} />
      </div>
      <DownloadData type={t('download')} params={{}} downloadAction={handleDownloadData} />
      <Details summary={t('help.title')}>
        <RichText>
          {tags => t.rich('help.content', {
            ...tags,
            link: chunks => <Link href="/page/definitions#data_sources" className="govuk-link">{chunks}</Link>,
          }) }
        </RichText>
      </Details>
    </>
  );
};

export { ConjunctionEventHistory };
