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
        {organisations.map(({ id, name, satellitesCount, accountsCount, createdAt }) => (
          <TableRow key={id}>
            <TableCell><Link className="govuk-link" href={`/account/organisations/${id}`}>{name}</Link></TableCell>
            <TableCell>{satellitesCount}</TableCell>
            <TableCell>{accountsCount}</TableCell>
            <TableCell>{dayjs(createdAt).format(FORMAT_SHORT_DATE)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  );
};

export { OrganisationsTable };
