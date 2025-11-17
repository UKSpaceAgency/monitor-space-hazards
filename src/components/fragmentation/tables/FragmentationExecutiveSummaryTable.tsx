import { getTranslations } from 'next-intl/server';

import type { TypeFragmentationReportOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { getFragmentationEventScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { renderRiskTag } from '@/utils/Risk';

type EventSummaryData = Pick<TypeFragmentationReportOut, 'primary_object_common_name' | 'event_epoch' | 'primary_object_inclination' | 'known_fragments' | 'modelled_fragments' | 'risk' | 'affected_regime' | 'primary_object_type' | 'primary_object_licensing_country' | 'fragmentation_type'>;

type FragmentationExecutiveSummaryTableProps = {
  report: TypeFragmentationReportOut;
};

const FragmentationExecutiveSummaryTable = async ({ report }: FragmentationExecutiveSummaryTableProps) => {
  const t = await getTranslations('Tables.Fragmentation_alert_executive_summary');
  const screeningResults = await getFragmentationEventScreeningResults(report.presigned_url);

  const rows: InformationsTableRow<EventSummaryData>[] = [
    {
      header: t('risk'),
      accessorKey: 'risk',
      renderCell: ({ risk }) => renderRiskTag(risk as TypeReentryRisk),
    },
    {
      header: t('event_epoch'),
      accessorKey: 'event_epoch',
      renderCell: ({ event_epoch }) => `${dayjs(event_epoch).format(FORMAT_FULL_DATE_TIME)}`,
    },
    {
      header: t('known_fragments'),
      accessorKey: 'known_fragments',
    },
    {
      header: t('modelled_fragments'),
      accessorKey: 'modelled_fragments',
    },
    {
      header: t('uk_satellites_affected'),
      renderCell: () => screeningResults.length,
    },
    {
      header: t('affected_regime'),
      accessorKey: 'affected_regime',
      renderCell: ({ affected_regime }) => affected_regime,
    },
    {
      header: t('potential_cause'),
      accessorKey: 'fragmentation_type',
    },
  ];

  return <InformationsTable rows={rows} data={report} className="text-base" />;
};

export { FragmentationExecutiveSummaryTable };
