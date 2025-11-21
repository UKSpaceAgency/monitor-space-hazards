'use client';
import { useTranslations } from 'next-intl';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { getConjunctionEventsColumns } from '@/components/conjunctions/data-table/ConjunctionsDataTableColumns';
import { DataTable } from '@/components/DataTable';

type DashboardConjunctionsDataTableProps = {
  data: TypeEventOut[];
  isAnalyst: boolean;
  haveAccessToAlerts: boolean;
};

const DashboardConjunctionsDataTable = ({ data, isAnalyst, haveAccessToAlerts }: DashboardConjunctionsDataTableProps) => {
  const t = useTranslations('Tables');

  const columns = getConjunctionEventsColumns({
    isAnalyst,
    haveAccessToAlerts,
    probabilityUnit: 'scientific',
  });

  return (
    <DataTable<TypeEventOut>
      data={data}
      columns={columns}
      emptyLabel={t('Conjunctions.table.empty_list_info')}
      enableSorting={false}
    />
  );
};

export { DashboardConjunctionsDataTable };
