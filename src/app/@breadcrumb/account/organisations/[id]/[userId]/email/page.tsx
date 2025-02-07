import { getTranslations } from 'next-intl/server';

import { getOrganisation } from '@/actions/getOrganisation';
import { getUsersById } from '@/actions/getUserById';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default async function BreadcrumbOrganisationSlot({
  params,
}: { params: Promise<{ id: string; userId: string }> }) {
  const { id, userId } = await params;
  const t = await getTranslations('Breadcrumb');
  const organisation = await getOrganisation(id);
  const user = await getUsersById(userId);

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
          <BreadcrumbLink href={`/account/organisations/${id}`}>{organisation.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/account/organisations/${id}/${userId}`}>{user.email}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Email</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
