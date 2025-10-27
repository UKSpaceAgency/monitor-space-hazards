import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { getFragmentationReports } from '@/actions/getFragmentationReports';
import { ContentNavigation } from '@/components/ContentNavigation';
import { FragmentationAccordion } from '@/components/fragmentation/FragmentationAccordion';
import { FragmentationButtons } from '@/components/fragmentation/FragmentationButtons';
import { FragmentationExecutiveSummary } from '@/components/fragmentation/FragmentationExecutiveSummary';
import { FragmentationNextUpdate } from '@/components/fragmentation/FragmentationNextUpdate';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

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
  const report = await getFragmentationReports({ shortId });
  const lastReport = report[report.length - 1];

  if (!event || !lastReport) {
    notFound();
  }

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title', { shortId })}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
          <ContentNavigation />
        </div>
        <div className="govuk-grid-column-three-quarters">
          {t.rich('report_info', { number: event.report_number?.toString(), time: dayjs(event.created_at).format(FORMAT_DATE_TIME) })}
          <FragmentationExecutiveSummary event={event} report={lastReport} />
          <FragmentationNextUpdate shortId={shortId} />
          <FragmentationAccordion event={event} report={lastReport} />
          {/* {spacetrack && (
            <ConjunctionEventSummary
              shortId={shortId}
              spacetrack={spacetrack}
              uksa={uksa}
              primaryObject={primaryObject}
              secondaryObject={secondaryObject}
              isSpecial={isSpecial}
            />
          )}
          <ConjunctionAccordion
            shortId={shortId}
            primaryObject={primaryObject}
            secondaryObject={secondaryObject}
            isSpecial={isSpecial}
          /> */}
          <FragmentationButtons title={t('title', { shortId })} />
        </div>
      </div>
    </>
  );
}
