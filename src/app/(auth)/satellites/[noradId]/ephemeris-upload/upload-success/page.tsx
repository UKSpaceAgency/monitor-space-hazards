import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';

export const metadata = {
  title: 'Ephemeris upload complete',
};

export default async function EphemerisUploadSuccess({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const t = await getTranslations('SatelliteEphemerisUploadSuccessPage');
  const tCommon = await getTranslations('Common');
  const { noradId } = await params;

  return (
    <div>
      <Panel heading={t('title')}>{t('content', { noradId })}</Panel>
      <Link href={`/satellites/${noradId}`}>
        <Button>{tCommon('return', { to: 'Satellite' })}</Button>
      </Link>
    </div>
  );
}
