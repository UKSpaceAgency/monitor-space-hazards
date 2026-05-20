import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getActivityEvent } from '@/actions/getActivityEvent';
import { ActivityAccordion } from '@/components/activity/ActivityAccordion';
import { ActivityEventSummary } from '@/components/activity/ActivityEventSummary';
import { ContentNavigation } from '@/components/ContentNavigation';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Activity');
  const { shortId } = await params;
  return {
    title: t('title', { shortId }),
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Activity');
  const { shortId } = await params;
  const event = await getActivityEvent(shortId);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { shortId })}
      </h1>
      <ContentNavigation />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <ActivityEventSummary event={event} />
      <ActivityAccordion noradId={event.norad_id} />
    </div>
  );
};
