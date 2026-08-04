import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

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

export default async function ActivityPage() {
  notFound();
  // const t = await getTranslations('Activity');
  // const { shortId } = await params;
  // const event = await getActivityEvent(shortId);

  // if (!event) {
  //   notFound();
  // }

  // return (
  //   <div>
  //     <h1 className="govuk-heading-xl">
  //       {t('title', { shortId })}
  //     </h1>
  //     <ContentNavigation />
  //     <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
  //     <ActivityEventSummary event={event} />
  //     <ActivityAccordion noradId={event.norad_id} />
  //   </div>
  // );
};
