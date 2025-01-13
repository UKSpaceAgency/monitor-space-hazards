import { getTranslations } from 'next-intl/server';

import { getSatellite } from '@/actions/getSatellite';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default async function BreadcrumbSatelliteSlot({
  params,
}: { params: Promise<{ noradId: string }> }) {
  const { noradId } = await params;
  const t = await getTranslations('Breadcrumb');

  const satellite = await getSatellite(noradId);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/satellites">{t('satellites')}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>{satellite.commonName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
