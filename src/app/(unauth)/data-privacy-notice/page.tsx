import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';
import Button from '@/ui/button/button';

export const metadata: Metadata = {
  title: 'Data privacy notice',
};

export default async function DataPrivacyNotice() {
  const t = await getTranslations('Data_privacy_notice');
  const { content } = await getPage('data-privacy-notice');

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <HtmlMapper content={content} />
      <a href="/Monitor Space Hazards Privacy Notice.pdf" download>
        <Button>{t('button')}</Button>
      </a>
    </>
  );
}
