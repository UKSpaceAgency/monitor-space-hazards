import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';
import { isAgencyApprover } from '@/utils/Roles';

export const metadata = {
  title: 'Conjunction upload complete',
};

export default async function ConjunctionSuccessfulAnalysisUpload({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Conjunction_analysis_upload.Success');
  const tCommon = await getTranslations('Common');
  const { shortId } = await params;

  const session = await getSession();

  if (!isAgencyApprover(session?.user.role)) {
    return notFound();
  }

  return (
    <div>
      <Panel heading={t('title')}>{t('content', { shortId })}</Panel>
      <Link href={`/conjunctions/${shortId}`}>
        <Button>{tCommon('return', { to: 'conjunction event' })}</Button>
      </Link>
    </div>
  );
};
