import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'UKSA analysis uploads',
};

export default async function AnalysisUploadLog() {
  const t = await getTranslations('AnalysisUploadLog');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
    </div>
  );
}
