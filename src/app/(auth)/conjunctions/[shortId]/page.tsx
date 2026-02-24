import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getConjunctionEvent } from '@/actions/getConjunctionEvent';
import { getConjunctionEventsSatelliteEventShortId } from '@/actions/getConjunctionEventsSatelliteEvent';
import { getConjunctionReports } from '@/actions/getConjunctionReports';
import { getSession } from '@/actions/getSession';
import { ConjunctionAccordion } from '@/components/conjunction/ConjunctionAccordion';
import { ConjunctionButtons } from '@/components/conjunction/ConjunctionButtons';
import { ConjunctionEventSummary } from '@/components/conjunction/ConjunctionEventSummary';
import { ContentNavigation } from '@/components/ContentNavigation';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Tag from '@/ui/tag/tag';
import { isSatteliteUser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;

};

export async function generateMetadata({
  params,
}: PageProps) {
  const { shortId } = await params;
  const event = await getConjunctionEventsSatelliteEventShortId(shortId);
  return {
    title: event.short_id,
  };
}

export default async function ConjunctionPage({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction');
  const session = await getSession();
  const { shortId } = await params;
  const { primary_object, secondary_object } = await getConjunctionEventsSatelliteEventShortId(shortId);
  const { event, spacetrack, uksa } = await getConjunctionEvent({ eventId: shortId });
  const reports = await getConjunctionReports({ shortId });
  const isSpecial = event.primary_object_cdm_type === 'Special owner/operator ephemeris';

  return (
    <>
      {reports.length > 0 && !isSatteliteUser(session?.user.role) && (
        <NotificationBanner heading={t.rich('notification_banner', {
          preview: chunks => <Link className="govuk-link" href={`/conjunctions/${shortId}/alert`}>{chunks}</Link>,
        })}
        />
      )}
      {isSpecial && <Tag>{t('special_only')}</Tag>}
      <h1 className="govuk-heading-xl">{t('title', { id: shortId })}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
          <ContentNavigation />
        </div>
        <div className="govuk-grid-column-three-quarters">
          {spacetrack && (
            <ConjunctionEventSummary
              shortId={shortId}
              spacetrack={spacetrack}
              uksa={uksa}
              primaryObject={primary_object}
              secondaryObject={secondary_object}
              isSpecial={isSpecial}
            />
          )}
          <ConjunctionAccordion
            shortId={shortId}
            primaryObject={primary_object}
            secondaryObject={secondary_object}
            isSpecial={isSpecial}
          />
          <ConjunctionButtons title={t('title', { id: shortId })} />
        </div>
      </div>
    </>
  );
}
