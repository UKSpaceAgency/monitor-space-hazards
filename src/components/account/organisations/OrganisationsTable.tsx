import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';

type OrganisationsSummaryProps = {
  organisations: TypeOrganizationOut[];
};

const OrganisationsTable = ({ organisations }: OrganisationsSummaryProps) => {
  const t = useTranslations('Organisations.table');

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>{t('organisation')}</TableCellHeader>
            <TableCellHeader>{t('registered_satellites')}</TableCellHeader>
            <TableCellHeader>{t('registered_users')}</TableCellHeader>
            <TableCellHeader>{t('date_added')}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {organisations.map(({ id, name, satellites_count, accounts_count, created_at }) => (
            <TableRow key={id}>
              <TableCell><Link className="govuk-link" href={`/account/organisations/${id}`}>{name}</Link></TableCell>
              <TableCell>{satellites_count}</TableCell>
              <TableCell>{accounts_count}</TableCell>
              <TableCell>{dayjs(created_at).format(FORMAT_SHORT_DATE)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { OrganisationsTable };
