import { Fragment, type ReactElement } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/ui/breadcrumbs/breadcrumbs';

export default function BreadcrumbSlot({
  params,
}: { params: { catchAll: string[] } }) {
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  if (params.catchAll.length <= 1) {
    return null;
  }

  params.catchAll.forEach((element, i) => {
    const route = element.replaceAll('-', ' ');
    const href = `/${params.catchAll.at(0)}/${route}`;
    if (i === params.catchAll.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage>{route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>,
      );
    }
  });
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
