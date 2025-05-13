import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';

import type { TypeReentryEventPatch, TypeReentryRisk } from '@/__generated__/data-contracts';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getReentryReports } from '@/actions/getReentryReports';
import { FORMAT_DATE_TIME, FORMAT_FULL_DATE, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';
import Spinner from '@/ui/spinner/spinner';
import Tag from '@/ui/tag/tag';
import { getFullCountry } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Risk';

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

  return (
    <div>
      {isClosed && <Tag>{t('closed')}</Tag>}
      <h1 className="govuk-heading-xl">
        {title}
        <span className="block text-lg">{dayjs(event.decayEpoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          {t.rich('report_info', { number: event.reentryReportNumber?.toString(), time: dayjs(event.updatedAt).format(FORMAT_DATE_TIME) })}
          {isClosed
            ? (
                <InsetText>
                  {t.rich('closed_report', {
                    commonName: event.objectName,
                    date: dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME),
                    riskLevel: lastReport?.monteCarloRisk,
                    riskProbability: lastReport?.monteCarloProbability,
                    licensingCountry: getFullCountry(event.licenseCountry),
                    tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
                  })}
                </InsetText>
              )
            : (
                <Suspense fallback={<Spinner />}>
                  <ReentryAlertExecutiveSummary event={event} previewSummary={searchParams?.exec_summary} />
                </Suspense>
              )}
          <Suspense fallback={<Spinner />}>
            {lastReport?.presignedUrl && (
              <ReentryAlertMapContainer presignedUrl={lastReport.presignedUrl} />
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
