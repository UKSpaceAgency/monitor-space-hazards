import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { SatelliteEphemerisUploadForm } from '@/components/satellite/SatelliteEphemerisUploadForm';
import Details from '@/ui/details/details';
import { isAgencyApprover, isSatteliteOperator } from '@/utils/Roles';

export const metadata = {
  title: 'Upload your ephemeris data',
};

export default async function EphemerisUpload({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const t = await getTranslations('Satellite_ephemeris_upload');
  const session = await getSession();

  if (!isAgencyApprover(session?.user.role) && !isSatteliteOperator(session?.user.role)) {
    notFound();
  }

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
