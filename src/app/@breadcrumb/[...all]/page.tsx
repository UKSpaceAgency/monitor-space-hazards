import { getTranslations } from 'next-intl/server';
import { Fragment, type ReactElement } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default async function BreadcrumbSlot({
  params,
}: { params: Promise<{ all: string[] }> }) {
  const t = await getTranslations('Breadcrumb');
  const { all } = await params;

  const breadcrumbItems: ReactElement[] = [];
  // eslint-disable-next-line react/no-useless-fragment
  let breadcrumbPage: ReactElement = <></>;

  if (all.length === 1) {
    return null;
  }

  for (let i = 0; i < all.length; i++) {
    const route = all[i] as any;
    const href = `/${all.slice(0, i + 1).join('/')}`;
    if (i === all.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage>{t.has(route) ? t(route) : route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>
              {t.has(route) ? t(route) : route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>,
      );
    }
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
