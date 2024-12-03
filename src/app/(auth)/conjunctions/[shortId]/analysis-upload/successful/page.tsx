import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';

export const metadata = {
  title: 'Conjunction upload complete',
};

export default async function ConjunctionSuccessfulAnalysisUpload({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ConjunctionAnalysisUploadSuccessPage');
  const tCommon = await getTranslations('Common');
  const { shortId } = await params;

  return (
    <div>
      <Panel heading={t('title')}>{t('content', { shortId })}</Panel>
      <Link href={`/conjunctions/${shortId}`}>
        <Button>{tCommon('return', { to: 'conjunction event' })}</Button>
      </Link>
    </div>
  );
};
