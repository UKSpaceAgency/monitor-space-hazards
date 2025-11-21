'use client';

import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';

import { reentriesColumns } from './ReentriesDataTableColumns';

type ReentriesAlertsDataTableProps = {
  data: TypeReentryEventOut[];
  haveAccessToAlerts?: boolean;
};

const ReentriesAlertsDataTable = ({ data, haveAccessToAlerts }: ReentriesAlertsDataTableProps) => {
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

export { ReentriesAlertsDataTable };
