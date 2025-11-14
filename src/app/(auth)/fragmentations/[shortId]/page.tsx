import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { getFragmentationReportsLatest } from '@/actions/getFragmentationReportsLatest';
import { ContentNavigation } from '@/components/ContentNavigation';
import { FragmentationAccordion } from '@/components/fragmentation/FragmentationAccordion';
import { FragmentationButtons } from '@/components/fragmentation/FragmentationButtons';
import { FragmentationExecutiveSummary } from '@/components/fragmentation/FragmentationExecutiveSummary';
import { FragmentationNextUpdate } from '@/components/fragmentation/FragmentationNextUpdate';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation');
  const { shortId } = await params;
  return {
    title: t('title', { shortId }),
  };
}

export default async function Fragmentation({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation');
  const { shortId } = await params;
  const event = await getFragmentationEvent(shortId);
  const report = await getFragmentationReportsLatest(shortId);

  if (!event || !report) {
    notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { shortId })}
        <span className="block text-lg">{dayjs(event.event_epoch).format(FORMAT_FULL_DATE_TIME)}</span>
      </h1>
      <ContentNavigation className="mb-8" />
      {t.rich('report_info', { number: event.report_number?.toString(), time: dayjs(event.created_at).format(FORMAT_DATE_TIME) })}
      <FragmentationExecutiveSummary event={event} report={report} />
      <FragmentationNextUpdate shortId={shortId} />
      <FragmentationAccordion event={event} report={report} />
      <FragmentationButtons title={t('title', { shortId })} />
    </div>
  );
}
