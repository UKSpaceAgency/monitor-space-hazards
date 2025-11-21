'use client';

import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { reentriesColumns } from '@/components/re-entries/data-table/ReentriesDataTableColumns';

type DashboardReentriesDataTableProps = {
  data: TypeReentryEventOut[];
  haveAccessToAlerts?: boolean;
};

const DashboardReentriesDataTable = ({ data, haveAccessToAlerts }: DashboardReentriesDataTableProps) => {
  const t = useTranslations('Tables');

  return (
    <DataTable<TypeReentryEventOut>
      data={data}
      columns={reentriesColumns(haveAccessToAlerts)}
      emptyLabel={t('Reentries.table.empty_list_info')}
      enableSorting={false}
    />
  );
};

export { DashboardReentriesDataTable };
