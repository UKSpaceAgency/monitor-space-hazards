import { notFound } from 'next/navigation';

import type { TypeEpoch, TypeReportFlagSettings } from '@/__generated__/data-contracts';
import { getSatellite } from '@/actions/getSatellite';
import { ContentNavigation } from '@/components/ContentNavigation';
import { SatelliteAccordion } from '@/components/satellite/SatelliteAccordion';

type PageProps = {
  params: Promise<{ noradId: string }>;
  searchParams?: Promise<{
    report?: TypeReportFlagSettings;
    epoch?: TypeEpoch;
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
  const { noradId } = await props.params;
  const { epoch, report } = await props.searchParams || {};
  const satellite = await getSatellite(noradId);

  if (!satellite.norad_id) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">{satellite.common_name}</h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <article className="md:col-span-3">
          <SatelliteAccordion object={satellite} noradId={noradId} epoch={epoch} report={report} />
        </article>
      </div>
    </div>
  );
}
