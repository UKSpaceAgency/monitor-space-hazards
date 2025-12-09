import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';
import { isAgencyApprover, isSatteliteOperator } from '@/utils/Roles';

export const metadata = {
  title: 'Ephemeris upload complete',
};

export default async function EphemerisUploadSuccess({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const t = await getTranslations('Satellite_ephemeris_upload.Success');
  const session = await getSession();

  if (!isAgencyApprover(session?.user.role) && !isSatteliteOperator(session?.user.role)) {
    notFound();
  }

  const tCommon = await getTranslations('Common');
  const { noradId } = await params;

  return (
    <div>
      <Panel heading={t('title')}>{t('content', { noradId })}</Panel>
      <Button as="link" href={`/satellites/${noradId}`} aria-label={tCommon('return', { to: 'Satellite' })}>{tCommon('return', { to: 'Satellite' })}</Button>
    </div>
  );
}
