import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import { getConjunctionReports } from '@/actions/getConjunctionReports';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

import { ContentNavigation } from '../ContentNavigation';
import { ConjunctionAlertAccordion } from './ConjunctionAlertAccordion';
import { ConjunctionAlertExecutiveSummary } from './ConjunctionAlertExecutiveSummary';
import { ConjunctionAlertNextUpdate } from './ConjunctionAlertNextUpdate';

type ConjunctionAlertPageProps = {
  shortId: string;
  searchParams?: TypeUniqueEventUpdateTextFieldsIn;
  footer?: ReactNode;
};

const ConjunctionAlertPage = async ({ shortId, searchParams, footer }: ConjunctionAlertPageProps) => {
  const t = await getTranslations('Conjunction_alert');
  const tCommon = await getTranslations('Common');
  const event = await getConjunctionUniqueEvent(shortId);
  const reports = await getConjunctionReports({ shortId });
  const lastReport = reports[reports.length - 1];

  if (!lastReport) {
    notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { shortId })}
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          {t.rich('report_info', { number: lastReport.reportNumber.toString(), time: dayjs(lastReport.reportTime).format(FORMAT_DATE_TIME) })}
          <ConjunctionAlertExecutiveSummary event={event} report={lastReport} previewSummary={searchParams?.exec_summary_addition} />
          <ConjunctionAlertNextUpdate shortId={shortId} />
          <ConjunctionAlertAccordion event={event} report={lastReport} reports={reports} />
          {footer || (
            <ButtonGroup>
              <Link href="/re-entries">
                <Button variant="secondary">{tCommon('return', { to: 'previous page' })}</Button>
              </Link>
            </ButtonGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export { ConjunctionAlertPage };
