'use client';
import { useTranslations } from 'next-intl';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ConjunctionEventHistoryGeneralInformations = Pick<
  TypeEventSummaryOut,
'collisionProbabilityMethod' | 'primaryObjectSize' | 'secondaryObjectSize'
>;

type ConjunctionEventHistoryGeneralTableProps = {
  object: ConjunctionEventHistoryGeneralInformations | ConjunctionEventHistoryGeneralInformations[];
};

const ConjunctionEventHistoryDataTable = ({ object }: ConjunctionEventHistoryGeneralTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionEventHistoryGeneralInformations>[] = [{
    header: t('event_history.sub_table.probability_of_collision'),
    accessorKey: 'collisionProbabilityMethod',
  }, {
    header: t('event_history.sub_table.primary_object'),
    accessorKey: 'primaryObjectSize',
  }, {
    header: t('event_history.sub_table.secondary_object'),
    accessorKey: 'secondaryObjectSize',
  }];

  return <InformationsTable rows={rows} data={object} reducedFont />;
};

export { ConjunctionEventHistoryDataTable };
