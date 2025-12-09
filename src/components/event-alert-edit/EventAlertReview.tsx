'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { Table, TableBody, TableCell, TableCellHeader, TableRow } from '@/ui/table/Table';
import { getBackUrl } from '@/utils/Helpers';

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

  const prevPageUrl = getBackUrl(pathname, 1, searchParams);

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
        <Button as="link" href={`${pathname}/preview?${searchParams.toString()}`} type="submit" aria-label={t('preview')}>{t('preview')}</Button>
        <Button as="link" href={prevPageUrl} variant="secondary" aria-label={tCommon('return', { to: 'edit event' })}>{tCommon('return', { to: 'edit event' })}</Button>
      </ButtonGroup>
    </div>
  );
};

export { EventAlertReview };
