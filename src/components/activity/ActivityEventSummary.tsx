import { getTranslations } from 'next-intl/server';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';
import Details from '@/ui/details/details';

import { ActivityEventSummaryTable } from './tables/ActivityEventSummaryTable';

type ActivityEventSummaryProps = {
  event: TypeActivityEvent;
};

const ActivityEventSummary = async ({ event }: ActivityEventSummaryProps) => {
  const t = await getTranslations('Activity.Event_summary');

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">
        {t('content', { commonName: event.common_name })}
      </p>
      {event && <ActivityEventSummaryTable event={event} />}
      <Details summary={t('help.title')}>{t('help.content')}</Details>
      <Button as="link" href={`/contact-analyst/reentries?id=${event.short_id}&callback=/re-entries/${event.short_id}`} aria-label={t('contact_analyst')}>{t('contact_analyst')}</Button>
    </div>
  );
};

export { ActivityEventSummary };
