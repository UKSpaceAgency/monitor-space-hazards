import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Contact a UKSA orbital analyst',
};

export default async function ContactAnalyst() {
  const t = await getTranslations('ContactAnalyst');

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content', {
        list: chunks => <ul className="govuk-list govuk-list--bullet">{chunks}</ul>,
        item: chunks => <li>{chunks}</li>,
        bold: chunks => <b>{chunks}</b>,
      })}
    </>
  );
}
