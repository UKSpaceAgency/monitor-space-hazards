import dayjs from 'dayjs';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getReentryReports } from '@/actions/getReentryReports';
import { FORMAT_DATE_TIME, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Spinner from '@/ui/spinner/spinner';

import { ContentNavigation } from '../ContentNavigation';
import { ReentryAlertMapContainer } from './map/ReentryAlertMapContainer';
import { ReentryAlertAccordion } from './ReentryAlertAccordion';
import { ReentryAlertExecutiveSummary } from './ReentryAlertExecutiveSummary';
import { ReentryAlertNextUpdate } from './ReentryAleryNextUpdate';

type ReentryAlertPageProps = {
  shortId: string;
  searchParams?: TypeReentryEventPatch;
  footer?: ReactNode;
};

const ReentryAlertPage = async ({ shortId, searchParams, footer }: ReentryAlertPageProps) => {
  const t = await getTranslations('ReentryAlert');
  const tCommon = await getTranslations('Common');
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
            <ReentryAlertExecutiveSummary event={event} previewSummary={searchParams?.exec_summary} />
          </Suspense>
          {reports[0]?.presignedUrl && (
            <Suspense fallback={<Spinner />}>
              <ReentryAlertMapContainer presignedUrl={reports[0].presignedUrl} />
            </Suspense>
          )}
          <ReentryAlertNextUpdate shortId={shortId} />
          <ReentryAlertAccordion event={event} reports={reports} />
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

export { ReentryAlertPage };
