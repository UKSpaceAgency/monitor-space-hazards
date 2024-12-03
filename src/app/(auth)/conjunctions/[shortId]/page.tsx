import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionEventsSatelliteEventShortId } from '@/actions/getConjunctionEvent';
import { getConjunctionEventsEventIdDataSources } from '@/actions/getConjunctionEventsEventIdDataSources';
import { getConjunctionEventsEventIdSummary } from '@/actions/getConjunctionEventsEventIdSummary';
import { getManoeuvrePlots } from '@/actions/getManoeuvrePlots';
import { getUsersMe } from '@/actions/getUsersMe';
import { ConjunctionAccordion } from '@/components/conjunction/ConjunctionAccordion';
import { ConjunctionEventSummary } from '@/components/conjunction/ConjunctionEventSummary';
import { ContentNavigation } from '@/components/ContentNavigation';
import { isAnalysist } from '@/utils/Roles';

export async function generateMetadata({
  params,
}: {
  params: { shortId: string };
}) {
  const { shortId } = await params;
  const event = await getConjunctionEventsSatelliteEventShortId(shortId);
  return {
    title: event.shortId,
  };
}

export default async function ConjunctionPage({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Conjunction');

  const { shortId } = await params;
  const { primaryObject, secondaryObject } = await getConjunctionEventsSatelliteEventShortId(shortId);
  const dataSources = await getConjunctionEventsEventIdDataSources({ eventId: shortId });
  const events = await getConjunctionEventsEventIdSummary({ eventId: shortId });
  const manoeuvrePlots = await getManoeuvrePlots();
  const user = await getUsersMe();

  const event = events.find(event => event.shortId === shortId);

  if (!event) {
    return notFound();
  }

  const haveMtp = manoeuvrePlots.length > 0;
  const isUserAnalysist = isAnalysist(user.role);

  const handleDownloadData = async () => {
    'use server';
    const events = await getConjunctionEventsEventIdSummary({ eventId: shortId });

    const event = events.find(event => event.shortId === shortId);

    if (!event) {
      throw new Error('Cannot Download this file!');
    }

    return event;
  };

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title', { id: shortId })}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
          <ContentNavigation />
        </div>
        <div className="govuk-grid-column-three-quarters">
          <ConjunctionEventSummary
            isUserAnalysist={isUserAnalysist}
            shortId={shortId}
            event={event}
            primaryObject={primaryObject}
            secondaryObject={secondaryObject}
          />
          <ConjunctionAccordion
            id={shortId}
            haveMtp={haveMtp}
            primaryObject={primaryObject}
            secondaryObject={secondaryObject}
            events={events}
            event={event}
            dataSources={dataSources}
            handleDownloadData={handleDownloadData}
          />
        </div>
      </div>
    </>
  );
}
