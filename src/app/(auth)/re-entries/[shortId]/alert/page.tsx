import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getReentryReports } from '@/actions/getReentryReports';
import { getSatellite } from '@/actions/getSatellite';
import { ContentNavigation } from '@/components/ContentNavigation';
import { ReentryAlertAccordion } from '@/components/re-entry-alert/ReentryAlertAccordion';
import { ReentryAlertExecutiveSummary } from '@/components/re-entry-alert/ReentryAlertExecutiveSummary';
import { ReentryAlertNextUpdate } from '@/components/re-entry-alert/ReentryAleryNextUpdate';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import Spinner from '@/ui/spinner/spinner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ReentryAlert');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.noradId);

  if (!event && !satellite) {
    notFound();
  }
  return {
    title: t('title', { objectName: satellite.commonName }),
  };
}

export default async function Reentry({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ReentryAlert');
  const tCommon = await getTranslations('Common');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const reports = await getReentryReports({ shortId });

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { objectName: event.objectName })}
        <span className="block text-lg">{dayjs(event.decayEpoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          {t.rich('report_info', { number: event.reentryReportNumber?.toString(), time: dayjs(event.updatedAt).format(FORMAT_DATE_TIME) })}
          <Suspense fallback={<Spinner />}>
            <ReentryAlertExecutiveSummary event={event} />
          </Suspense>
          <ReentryAlertNextUpdate shortId={shortId} />
          <ReentryAlertAccordion event={event} reports={reports} />
          <Link href="/re-entries">
            <Button variant="secondary">{tCommon('return', { to: 'previous page' })}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
