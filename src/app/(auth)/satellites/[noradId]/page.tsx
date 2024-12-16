import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getEphemerises } from '@/actions/getEphemerises';
import { getSatellite } from '@/actions/getSatellite';
import { ContentNavigation } from '@/components/ContentNavigation';
import { SatelliteAdditionalInformations } from '@/components/satellite/SatelliteAdditionalInformation';
import { SatelliteConjunctionEvents } from '@/components/satellite/SatelliteConjunctionEvents';
import { SatelliteEphemerisData } from '@/components/satellite/SatelliteEphemerisData';
import { SatelliteInformation } from '@/components/satellite/SatelliteInformation';
import Button from '@/ui/button/button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const { noradId } = await params;
  try {
    const satelltite = await getSatellite(noradId);
    return {
      title: satelltite.commonName,
    };
  } catch {
    notFound();
  }
}

export default async function Satellite({
  params,
  searchParams,
}: {
  params: Promise<{ noradId: string }>;
  searchParams?: Promise<{
    upcoming_search_like?: string;
    previous_search_link?: string;
  }>;
}) {
  const t = await getTranslations('Common');
  const { noradId } = await params;
  const { upcoming_search_like, previous_search_link } = await searchParams || {};
  const satelltite = await getSatellite(noradId);
  const ephemerises = await getEphemerises({
    norad_id: noradId,
    sort_by: 'updated_at',
  });

  return (
    <div>
      <h1 className="govuk-heading-xl">{satelltite.commonName}</h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          <SatelliteConjunctionEvents noradId={noradId} query={upcoming_search_like} epoch="future" />
          <SatelliteEphemerisData noradId={noradId} ephemerises={ephemerises} />
          <SatelliteInformation object={satelltite} />
          <SatelliteAdditionalInformations object={satelltite} />
          <SatelliteConjunctionEvents noradId={noradId} query={previous_search_link} epoch="past" />
          <Link href="/satellites">
            <Button variant="secondary">{t('return', { to: 'all satellites' })}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
