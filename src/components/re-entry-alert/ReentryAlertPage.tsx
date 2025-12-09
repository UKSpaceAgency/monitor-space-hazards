import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getReentryReports } from '@/actions/getReentryReports';
import { FORMAT_DATE_TIME, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import Tag from '@/ui/tag/tag';

import { ContentNavigation } from '../ContentNavigation';
import { ReentryAlertMapContainer } from './map/ReentryAlertMapContainer';
import { ReentryAlertAccordion } from './ReentryAlertAccordion';
import { ReentryAlertButtons } from './ReentryAlertButtons';
import { ReentryAlertExecutiveSummary } from './ReentryAlertExecutiveSummary';
import { ReentryAlertNextUpdate } from './ReentryAlertNextUpdate';

type ReentryAlertPageProps = {
  shortId: string;
  searchParams?: TypeReentryEventPatch;
  footer?: ReactNode;
};

const ReentryAlertPage = async ({ shortId, searchParams, footer }: ReentryAlertPageProps) => {
  const t = await getTranslations('Reentry_alert');
  const event = await getReentryEvent(shortId);
  const reports = await getReentryReports({ shortId });
  const title = t('title', { objectName: event.objectName });
  const pdfTitle = t('pdf_title', { objectName: event.objectName, reportNumber: event.reentryReportNumber?.toString() });

  const lastReport = reports[reports.length - 1];
  const isClosed = lastReport?.alertType.includes('closedown');
  const closedComment = searchParams?.closed_comment ?? event.closedComment;

  if (!lastReport) {
    return redirect(`/re-entries/${shortId}`);
  }

  return (
    <div>
      {isClosed
      && (
        <div className="flex items-center gap-4 mb-4">
          <Tag>{t('closed')}</Tag>
          {closedComment && (
            <span>{closedComment}</span>
          )}
        </div>
      )}
      <h1 className="govuk-heading-xl">
        {title}
        <span className="block text-lg">{dayjs(event.decayEpoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <div>
        <ContentNavigation />
        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
        <div className="md:col-span-3">
          {t.rich('report_info', { number: event.reentryReportNumber?.toString(), time: dayjs(event.updatedAt).format(FORMAT_DATE_TIME) })}
          <Suspense fallback={<Spinner />}>
            <ReentryAlertExecutiveSummary event={event} executiveSummaryComment={searchParams?.executive_summary_comment ?? event.executiveSummaryComment} isClosed={isClosed} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            {lastReport?.id && (
              <ReentryAlertMapContainer
                reentryId={shortId}
                reportId={lastReport.reportNumber.toString().padStart(3, '0')}
                overflightTime={event.overflightTime}
              />
            )}
          </Suspense>
          <ReentryAlertNextUpdate shortId={shortId} />
          <ReentryAlertAccordion event={event} reports={reports} lastReport={lastReport} searchParams={searchParams} />
          {footer || <ReentryAlertButtons pdfTitle={pdfTitle} />}
        </div>
      </div>
    </div>
  );
};

export { ReentryAlertPage };
