import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { ContactAnalystForm } from '@/components/contact-analyst/ContactAnalystForm';
import SummaryList from '@/ui/summary-list/summary-list';

export const metadata: Metadata = {
  title: 'Contact a UKSA orbital analyst',
};

export default async function ContactAnalyst(props: { searchParams: Promise<{ id: string; callback: string }> }) {
  const t = await getTranslations('Contact_analyst');

  const session = await getSession();

  const searchParams = await props.searchParams;

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <div className="govuk-body">
        {t.rich('content')}
      </div>
      <SummaryList
        rows={[
          {
            key: {
              children: t('event_id'),
            },
            value: {
              children: searchParams.id,
            },
          },
          {
            key: {
              children: t('email_address'),
            },
            value: {
              children: session?.user.email,
            },
          },
        ]}
      />
      <ContactAnalystForm searchParams={searchParams} />
    </>
  );
}
