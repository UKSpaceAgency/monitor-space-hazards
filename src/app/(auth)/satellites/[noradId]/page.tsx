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
      <ContentNavigation />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <SatelliteAccordion object={satellite} noradId={noradId} epoch={epoch} report={report} />
    </div>
  );
}
