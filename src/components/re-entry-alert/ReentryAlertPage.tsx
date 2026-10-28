import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getReentryReports } from '@/actions/getReentryReports';
import { getTips } from '@/actions/getTips';
import { FORMAT_DATE_TIME_FULL_MONTH, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import Tag from '@/ui/tag/tag';
import { isClosedownAlertType } from '@/utils/AlertType';
import { getCommentString, type ReentryAlertEditFormValues } from '@/utils/reentryEditForm';

import { ContentNavigation } from '../ContentNavigation';
import { ReentryAlertMapContainer } from './map/ReentryAlertMapContainer';
import { ReentryAlertAccordion } from './ReentryAlertAccordion';
import { ReentryAlertButtons } from './ReentryAlertButtons';
import { ReentryAlertExecutiveSummary } from './ReentryAlertExecutiveSummary';
import { ReentryAlertNextUpdate } from './ReentryAlertNextUpdate';

type ReentryAlertPageProps = {
  shortId: string;
  searchParams?: ReentryAlertEditFormValues;
  footer?: ReactNode;
};

const ReentryAlertPage = async ({ shortId, searchParams, footer }: ReentryAlertPageProps) => {
  const t = await getTranslations('Reentry_alert');
  const event = await getReentryEvent(shortId);
  const reports = await getReentryReports({ shortId });
  const tips = await getTips(event.norad_id);
  const title = t('title', { objectName: event.object_name ?? 'Unknown object' });

  const lastReport = reports[reports.length - 1];
  const lastTip = tips[0];
  const isClosed = isClosedownAlertType(lastReport?.alert_type);
  const closedComment = getCommentString(searchParams?.closed_comment ?? event.closed_comment);

  // Preview overlays (searchParams) take precedence; otherwise use resolved default.
  const executiveSummaryComment = getCommentString(
    searchParams?.executive_summary_comment
    ?? event.executive_summary_comment_levels
    ?? event.executive_summary_comment,
  );

  // Preview-only: show Level 1 / Level 2 overrides with labels describing the comment type.
  const isPreview = Boolean(searchParams);
  const previewLevel1 = isPreview
    ? (searchParams?.executive_summary_comment_level_1?.trim()
      || event.executive_summary_comment_levels?.level_1
      || null)
    : null;
  const previewLevel2 = isPreview
    ? (searchParams?.executive_summary_comment_level_2?.trim()
      || event.executive_summary_comment_levels?.level_2
      || null)
    : null;

  const pdfTitle = t(isClosed ? 'pdf_title_closed' : 'pdf_title', { objectName: event.object_name ?? 'Unknown object', reportNumber: event.reentry_report_number?.toString() });

  if (!lastReport) {
    return redirect(`/re-entries/${shortId}`);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="govuk-heading-xl mb-0">
          {title}
          <span className="block text-lg">{dayjs(event.decay_epoch).format(FORMAT_FULL_DATE)}</span>
        </h1>
        {isClosed
        && (
          <div className="flex items-center gap-4 mt-4">
            <Tag>{t('closed')}</Tag>
            {closedComment && (
              <span>{closedComment}</span>
            )}
          </div>
        )}
      </div>
      <ContentNavigation />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      {t.rich('report_info', { number: event.reentry_report_number?.toString(), time: dayjs(event.updated_at).format(FORMAT_DATE_TIME_FULL_MONTH) })}
      <Suspense fallback={<Spinner />}>
        <ReentryAlertExecutiveSummary
          event={event}
          report={lastReport}
          executiveSummaryComment={executiveSummaryComment}
          executiveSummaryCommentLevel1={previewLevel1}
          executiveSummaryCommentLevel2={previewLevel2}
          isClosed={isClosed}
        />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {lastReport?.id && (
          <ReentryAlertMapContainer
            reentryId={shortId}
            reportId={lastReport.report_number.toString().padStart(3, '0')}
            overflightTime={event.overflight_time}
            tip={lastTip}
            isClosed={isClosed}
          />
        )}
      </Suspense>
      <ReentryAlertNextUpdate shortId={shortId} />
      <ReentryAlertAccordion event={event} reports={reports} lastReport={lastReport} searchParams={searchParams} isClosed={isClosed} />
      {footer || <ReentryAlertButtons pdfTitle={pdfTitle} pdfSubtitle={closedComment ?? undefined} />}
    </div>
  );
};

export { ReentryAlertPage };
