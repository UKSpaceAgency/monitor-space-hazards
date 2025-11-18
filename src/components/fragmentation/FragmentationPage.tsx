import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { getFragmentationReportsLatest } from '@/actions/getFragmentationReportsLatest';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';

import { ContentNavigation } from '../ContentNavigation';
import { FragmentationAccordion } from './FragmentationAccordion';
import { FragmentationButtons } from './FragmentationButtons';
import { FragmentationExecutiveSummary } from './FragmentationExecutiveSummary';
import { FragmentationNextUpdate } from './FragmentationNextUpdate';

type FragmentationPageProps = {
  shortId: string;
  footer?: ReactNode;
};

const FragmentationPage = async ({ shortId, footer }: FragmentationPageProps) => {
  const t = await getTranslations('Fragmentation');
  const event = await getFragmentationEvent(shortId);
  const report = await getFragmentationReportsLatest(shortId);

  if (!event || !report) {
    notFound();
  }
  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` })}
        <span className="block text-lg">{dayjs(event.event_epoch).format(FORMAT_FULL_DATE_TIME)}</span>
      </h1>
      <ContentNavigation className="mb-8" />
      {t.rich('report_info', { number: event.report_number?.toString(), time: dayjs(event.created_at).format(FORMAT_DATE_TIME) })}
      <FragmentationExecutiveSummary event={event} report={report} />
      <FragmentationNextUpdate shortId={shortId} />
      <FragmentationAccordion event={event} report={report} />
      {footer || <FragmentationButtons title={t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` })} />}
    </div>
  );
};

export { FragmentationPage };
