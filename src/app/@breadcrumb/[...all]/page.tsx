import { useTranslations } from 'next-intl';
import { Fragment, type ReactElement } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default function BreadcrumbSlot({
  params,
}: { params: { all: string[] } }) {
  const t = useTranslations('Breadcrumb');

  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  if (params.all.length === 1) {
    return null;
  }

  for (let i = 0; i < params.all.length; i++) {
    const route = params.all[i] as any;
    const href = `/${params.all.slice(0, i + 1).join('/')}`;
    if (i === params.all.length - 1) {
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
