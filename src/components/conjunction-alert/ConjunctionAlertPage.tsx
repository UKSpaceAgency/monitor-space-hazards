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
  const title = t('title', { primaryObject: event.primary_object_common_name, secondaryObject: event.secondary_object_common_name });

  const lastReport = reports[reports.length - 1];
  const isClosed = lastReport?.alert_type.includes('closedown');
  const closedComment = searchParams?.closed_comment ?? event.closed_comment;

  const pdfTitle = t(isClosed ? 'pdf_title_closed' : 'pdf_title', { primaryObject: event.primary_object_common_name, secondaryObject: event.secondary_object_common_name, reportNumber: event.report_number });

  if (!lastReport) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="govuk-heading-xl">
          {title}
          <span className="block text-lg">{dayjs(event.tca).format(FORMAT_FULL_DATE)}</span>
        </h1>
        {isClosed
        && (
          <div className="flex items-center gap-4 mb-4">
            <Tag>{t('closed')}</Tag>
            {closedComment && (
              <span>{closedComment}</span>
            )}
          </div>
        )}
      </div>
      <div>
        <ContentNavigation />
        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
        <div>
          {t.rich('report_info', { number: lastReport.report_number.toString(), time: dayjs(lastReport.report_time).format(FORMAT_DATE_TIME) })}
          <ConjunctionAlertExecutiveSummary report={lastReport} executiveSummaryComment={searchParams?.executive_summary_comment ?? event.executive_summary_comment} manoeuvreComment={searchParams?.manoeuvre_comment ?? event.manoeuvre_comment} isClosed={isClosed} />
          <ConjunctionAlertNextUpdate shortId={shortId} />
          <ConjunctionAlertAccordion event={event} report={lastReport} reports={reports} searchParams={searchParams} />
          {footer || <ConjunctionAlertPageButtons pdfTitle={pdfTitle} pdfSubtitle={closedComment ?? undefined} />}
        </div>
      </div>
    </div>
  );
};

export { ConjunctionAlertPage };
