import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionEvent } from '@/actions/getConjunctionEvent';
import { getConjunctionEventsSatelliteEventShortId } from '@/actions/getConjunctionEventsSatelliteEvent';
import { ConjunctionAccordion } from '@/components/conjunction/ConjunctionAccordion';
import { ConjunctionButtons } from '@/components/conjunction/ConjunctionButtons';
import { ConjunctionEventSummary } from '@/components/conjunction/ConjunctionEventSummary';
import { ContentNavigation } from '@/components/ContentNavigation';
import Tag from '@/ui/tag/tag';

export async function generateMetadata({
  params,
}: {
  params: { shortId: string };
}) {
  const { shortId } = await params;
  try {
    const event = await getConjunctionEventsSatelliteEventShortId(shortId);
    return {
      title: event.shortId,
    };
  } catch {
    notFound();
  }
}

export default async function ConjunctionPage({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Conjunction');

  const { shortId } = await params;
  const { primaryObject, secondaryObject } = await getConjunctionEventsSatelliteEventShortId(shortId);
  const event = await getConjunctionEvent({ eventId: shortId });
  const isSpecial = event?.primaryObjectCdmType === 'Special owner/operator ephemeris';

  return (
    <>
      {isSpecial && <Tag>{t('special_only')}</Tag>}
      <h1 className="govuk-heading-xl">{t('title', { id: shortId })}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
          <ContentNavigation />
        </div>
        <div className="govuk-grid-column-three-quarters">
          <ConjunctionEventSummary
            shortId={shortId}
            event={event}
            primaryObject={primaryObject}
            secondaryObject={secondaryObject}
            isSpecial={isSpecial}
          />
          <ConjunctionAccordion
            shortId={shortId}
            event={event}
            primaryObject={primaryObject}
            secondaryObject={secondaryObject}
            isSpecial={isSpecial}
          />
          <ConjunctionButtons title={t('title', { id: shortId })} />
        </div>
      </div>
    </>
  );
}
