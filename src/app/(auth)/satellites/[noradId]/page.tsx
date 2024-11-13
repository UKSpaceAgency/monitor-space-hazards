import { notFound } from 'next/navigation';

import { ContentNavigation } from '@/components/ContentNavigation';
import { SatelliteInformation } from '@/components/satellites/satellite/SatelliteInformation';
import Api from '@/libs/Api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const { noradId } = await params;
  const { data: satelltite } = await Api.getSatellitesNoradId(noradId);

  if (!satelltite) {
    notFound();
  }
  return {
    title: satelltite.commonName,
  };
}

export default async function Satellite({
  params,
}: {
  params: Promise<{ noradId: string }>;
}) {
  const { noradId } = await params;
  const { data: satelltite } = await Api.getSatellitesNoradId(noradId);

  return (
    <div>
      <h1 className="govuk-heading-xl">{satelltite.commonName}</h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          <SatelliteInformation object={satelltite} />
        </div>
      </div>
    </div>
  );
}
