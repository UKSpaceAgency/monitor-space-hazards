import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import Button from '@/ui/button/button';

import { ReentryEventSummaryTable } from './tables/ReentryEventSummaryTable';

type ReentryEventSummaryProps = {
  event: TypeReentryEventOut;
  object: TypeSatelliteOut;
  shortId: string;
};

const ReentryEventSummary = async ({ event, object, shortId }: ReentryEventSummaryProps) => {
  const t = await getTranslations('Re-entry.EventSummary');

  const { data } = await Api.getTipsNoradId({ noradId: event.noradId });

  return (
    <div>
      <h2 data-anchor="information" data-pdf className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">
        {t('reentering_object')}
        {' '}
        <Link href={`/satellites/${event.noradId}`} className="govuk-link">{object.commonName}</Link>
      </p>
      {data[0] && <ReentryEventSummaryTable tip={data[0]} />}
      <Link href={`/contact-analyst?id=${shortId}&callback=/re-entries/${shortId}`}><Button variant="secondary">{t('contact_analyst')}</Button></Link>
    </div>
  );
};

export { ReentryEventSummary };
