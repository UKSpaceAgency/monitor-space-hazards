import { getTranslations } from 'next-intl/server';

import { getUsersByOrganisation } from '@/actions/getUsers';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { AccountType } from '@/utils/Roles';

type OrganisationUsersTableProps = {
  organisationId: string;
};

const OrganisationUsersTable = async ({ organisationId }: OrganisationUsersTableProps) => {
  const t = await getTranslations('Organisation.users_table');

  const users = await getUsersByOrganisation(organisationId);

  return (
    <div>
      <h2 className="govuk-heading-l">{t('registered_users')}</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>{t('name')}</TableCellHeader>
            <TableCellHeader>{t('account_type')}</TableCellHeader>
            <TableCellHeader>{t('email')}</TableCellHeader>
            <TableCellHeader>{t('phone_number')}</TableCellHeader>
            <TableCellHeader>{t('registered')}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, firstName, lastName, email, phoneNumber, role, accountDetailsConfirmedAt }) => (
            <TableRow key={id}>
              <TableCell>{`${firstName} ${lastName}`}</TableCell>
              <TableCell>{role ? AccountType[role] : '-'}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phoneNumber || '-'}</TableCell>
              <TableCell>{accountDetailsConfirmedAt ? dayjs(accountDetailsConfirmedAt).format(FORMAT_SHORT_DATE) : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
};

export { OrganisationUsersTable };
