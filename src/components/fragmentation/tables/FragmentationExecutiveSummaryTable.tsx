import { useTranslations } from 'next-intl';

import type { TypeFragmentationReport, TypeReentryRisk } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Risk';

type EventSummaryData = Pick<TypeFragmentationReport, 'primary_object_common_name' | 'event_epoch' | 'primary_object_inclination' | 'known_fragments' | 'modelled_fragments' | 'risk' | 'affected_regime' | 'primary_object_type' | 'primary_object_licensing_country'>;

type FragmentationExecutiveSummaryTableProps = {
  report: TypeFragmentationReport;
};

const FragmentationExecutiveSummaryTable = ({ report }: FragmentationExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Fragmentation_alert_executive_summary');

  const rows: InformationsTableRow<EventSummaryData>[] = [
    {
      header: t('object_name'),
      accessorKey: 'primary_object_common_name',
    },
    {
      header: t('event_epoch'),
      accessorKey: 'event_epoch',
      renderCell: ({ event_epoch }) => `${dayjs(event_epoch).format(FORMAT_FULL_DATE_TIME)}`,
    },
    {
      header: t('inclination'),
      accessorKey: 'primary_object_inclination',
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
      header: t('risk'),
      accessorKey: 'risk',
      renderCell: ({ risk }) => renderRiskTag(risk as TypeReentryRisk),
    },
    {
      header: t('affected_regime'),
      accessorKey: 'affected_regime',
      renderCell: ({ affected_regime }) => affected_regime,
    },
    {
      header: t('primary_object_type'),
      accessorKey: 'primary_object_type',
    },
    {
      header: t('primary_object_licensing_country'),
      accessorKey: 'primary_object_licensing_country',
      renderCell: ({ primary_object_licensing_country }) => getFullCountry(primary_object_licensing_country),
    },
  ];

  return <InformationsTable rows={rows} data={report} className="text-base" />;
};

export { FragmentationExecutiveSummaryTable };
