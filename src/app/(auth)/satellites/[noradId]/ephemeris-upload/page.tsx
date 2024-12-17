import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { SatelliteEphemerisUploadForm } from '@/components/satellite/SatelliteEphemerisUploadForm';
import Details from '@/ui/details/details';

export const metadata = {
  title: 'Upload your ephemeris data',
};

export default async function EphemerisUpload({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const t = await getTranslations('Satellite_ephemeris_upload');
  const { noradId } = await params;

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content')}
      <SatelliteEphemerisUploadForm objectId={noradId} />
      <Details summary={t('help_summary')}>
        {t.rich('help_content', {
          link: chunks => <Link href="/account/terms-and-conditions" className="govuk-link">{chunks}</Link>,
        })}
      </Details>
    </div>
  );
}
