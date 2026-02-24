import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getEphemerises } from '@/actions/getEphemerises';
import { getSatellite } from '@/actions/getSatellite';
import { getSession } from '@/actions/getSession';
import { ContentNavigation } from '@/components/ContentNavigation';
import { SatelliteAdditionalInformations } from '@/components/satellite/SatelliteAdditionalInformation';
import { SatelliteConjunctionEvents } from '@/components/satellite/SatelliteConjunctionEvents';
import { SatelliteEphemerisData } from '@/components/satellite/SatelliteEphemerisData';
import { SatelliteInformation } from '@/components/satellite/SatelliteInformation';
import Button from '@/ui/button/button';
import { isAgencyApprover, isSatteliteOperator } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ noradId: string }>;
  searchParams?: Promise<{
    upcoming_search_like?: string;
    previous_search_link?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const { noradId } = await params;
  const satellite = await getSatellite(noradId);
  return {
    title: satellite.common_name,
  };
}

export default async function Satellite(props: PageProps) {
  const t = await getTranslations('Common');
  const session = await getSession();

  const { noradId } = await props.params;
  const { upcoming_search_like, previous_search_link } = await props.searchParams || {};
  const satellite = await getSatellite(noradId);
  const ephemerises = await getEphemerises({
    norad_id: noradId,
    sort_by: 'updated_at',
  });

  if (!satellite.norad_id) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">{satellite.common_name}</h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <article className="md:col-span-3">
          <SatelliteConjunctionEvents noradId={noradId} query={upcoming_search_like} epoch="future" id="future_search_bar" ariaLabel="Upcoming Conjunction Events" />
          <SatelliteEphemerisData
            noradId={noradId}
            ephemerises={ephemerises}
            showButtons={isAgencyApprover(session?.user.role) || isSatteliteOperator(session?.user.role)}
          />
          <SatelliteInformation object={satellite} />
          <SatelliteAdditionalInformations object={satellite} />
          <SatelliteConjunctionEvents noradId={noradId} query={previous_search_link} epoch="past" id="past_search_bar" ariaLabel="Previous Conjunction Events" />
          <Button as="link" href="/satellites" variant="secondary" aria-label={t('return', { to: 'all satellites' })}>{t('return', { to: 'all satellites' })}</Button>
        </article>
      </div>
    </div>
  );
}
