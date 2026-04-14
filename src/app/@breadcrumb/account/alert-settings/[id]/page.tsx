import { getTranslations } from 'next-intl/server';

import { getUsersById } from '@/actions/getUserById';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default async function BreadcrumbOrganisationSlot({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations('Breadcrumb');
  const user = await getUsersById(id);

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
          <BreadcrumbLink href="/account/distribution-list">{t('distribution-list')}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>
            {user.first_name}
            {' '}
            {user.last_name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
