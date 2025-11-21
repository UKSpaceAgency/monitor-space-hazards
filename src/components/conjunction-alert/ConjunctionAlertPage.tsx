import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import { getConjunctionReports } from '@/actions/getConjunctionReports';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import Tag from '@/ui/tag/tag';

import { ContentNavigation } from '../ContentNavigation';
import { ConjunctionAlertAccordion } from './ConjunctionAlertAccordion';
import { ConjunctionAlertExecutiveSummary } from './ConjunctionAlertExecutiveSummary';
import { ConjunctionAlertNextUpdate } from './ConjunctionAlertNextUpdate';
import { ConjunctionAlertPageButtons } from './ConjunctionAlertPageButtons';

type ConjunctionAlertPageProps = {
  shortId: string;
  searchParams?: TypeUniqueEventUpdateTextFieldsIn;
  footer?: ReactNode;
};

const ConjunctionAlertPage = async ({ shortId, searchParams, footer }: ConjunctionAlertPageProps) => {
  const t = await getTranslations('Conjunction_alert');
  const event = await getConjunctionUniqueEvent(shortId);
  const reports = await getConjunctionReports({ shortId, show_only_active: false });
  const title = t('title', { primaryObject: event.primaryObjectCommonName, secondaryObject: event.secondaryObjectCommonName });
  const pdfTitle = t('pdf_title', { primaryObject: event.primaryObjectCommonName, secondaryObject: event.secondaryObjectCommonName, reportNumber: event.reportNumber });

  const lastReport = reports[reports.length - 1];
  const isClosed = lastReport?.alertType.includes('closedown');
  const closedComment = searchParams?.closed_comment ?? event.closedComment;

  if (!lastReport) {
    notFound();
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
        <span className="block text-lg">{dayjs(event.tca).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          {t.rich('report_info', { number: lastReport.reportNumber.toString(), time: dayjs(lastReport.reportTime).format(FORMAT_DATE_TIME) })}
          <ConjunctionAlertExecutiveSummary report={lastReport} executiveSummaryComment={searchParams?.executive_summary_comment ?? event.executiveSummaryComment} manoeuvreComment={searchParams?.manoeuvre_comment ?? event.manoeuvreComment} isClosed={isClosed} />
          <ConjunctionAlertNextUpdate shortId={shortId} />
          <ConjunctionAlertAccordion event={event} report={lastReport} reports={reports} searchParams={searchParams} />
          {footer || <ConjunctionAlertPageButtons pdfTitle={pdfTitle} />}
        </div>
      </div>
    </div>
  );
};

export { ConjunctionAlertPage };
