import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionEventsSatelliteEventShortId } from '@/actions/getConjunctionEvent';
import { getConjunctionEventsEventIdDataSources } from '@/actions/getConjunctionEventsEventIdDataSources';
import { getConjunctionEventsEventIdSummary } from '@/actions/getConjunctionEventsEventIdSummary';
import { getManoeuvrePlots } from '@/actions/getManoeuvrePlots';
import { getUsersMe } from '@/actions/getUsersMe';
import { ConjunctionAccordion } from '@/components/conjunctions/conjunction/ConjunctionAccordion';
import { ConjunctionSummary } from '@/components/conjunctions/conjunction/ConjunctionSummary';
import { getConjunctionSideNavigationItems } from '@/components/conjunctions/conjunction/sideNavigationItems';
import SideNavigationList from '@/ui/side-navigation-list/side-navigation-list';
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

  const locales = {
    eventsSummary: t('side_navigation.events_summary'),
    pocChart: t('side_navigation.poc_chart'),
    manoeuvreSupport: t('side_navigation.manoeuvre_support'),
    missDistanceChart: t('side_navigation.miss_distance_chart'),
    objectData: t('side_navigation.object_data'),
    eventHistory: t('side_navigation.event_history'),
    furtherInformation: t('side_navigation.further_information'),
  };

  const haveMtp = manoeuvrePlots.length > 0;
  const isUserAnalysist = isAnalysist(user.role);

  const navigationItems = getConjunctionSideNavigationItems({
    locales,
    haveMtp,
  });

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
          <SideNavigationList title={t('side_navigation.title')} items={navigationItems} />
        </div>
        <div className="govuk-grid-column-three-quarters">
          <ConjunctionSummary
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
