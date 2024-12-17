'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { Table, TableBody, TableCell, TableCellHeader, TableRow } from '@/ui/table/Table';

import { Markdown } from '../Markdown';

type EventAlertReviewProps<T extends object> = {
  shortId: string;
  description: string;
  values: T;
};

const EventAlertReview = <T extends object>({ description, values }: EventAlertReviewProps<T>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Forms.Edit_alert');
  const tCommon = useTranslations('Common');

  const prevPageUrl = `${pathname.split('/').slice(0, -1).join('/')}?${searchParams.toString()}`;

  return (
    <div className="mt-12">
      <h2 className="govuk-heading-m">
        {description}
      </h2>
      <Table>
        <TableBody>
          {Object.entries(values).map(([key, value]) => (
            <TableRow key={key}>
              <TableCellHeader className="w-1/3">{t(`type.${key}` as any)}</TableCellHeader>
              <TableCell>{value ? <Markdown>{value}</Markdown> : 'N/A'}</TableCell>
              <TableCell className="w-20 text-right"><Link className="govuk-link" href={prevPageUrl}>{t('change')}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="govuk-body">{t('review_hint')}</p>
      <ButtonGroup>
        <Link href={`${pathname}/preview?${searchParams.toString()}`}>
          <Button type="submit">{t('preview')}</Button>
        </Link>
        <Link href={prevPageUrl}>
          <Button variant="secondary">{tCommon('return', { to: 'edit event' })}</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export { EventAlertReview };
