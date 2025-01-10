import { getTranslations } from 'next-intl/server';

import { getOrganisation } from '@/actions/getOrganisation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default async function BreadcrumbOrganisationSlot({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations('Breadcrumb');
  const organisation = await getOrganisation(id);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/account">{t('account')}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>{organisation.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
