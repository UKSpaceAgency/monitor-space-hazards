import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

type ConjunctionAlertExecutiveSummaryTableProps = {
  report: TypeConjunctionReportOut;
  manoeuvreComment?: string | null;
};

const ConjunctionAlertExecutiveSummaryTable = ({ report, manoeuvreComment }: ConjunctionAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Conjunction_alert_executive_summary');

  const rows: InformationsTableRow<Partial<TypeConjunctionReportOut>>[] = [{
    header: t('risk'),
    accessorKey: 'risk',
    renderCell: ({ risk }) => {
      const classes = {
        Low: 'govuk-tag--green',
        Medium: 'govuk-tag--yellow',
        High: 'govuk-tag--red',
      };

      return risk
        ? (
            <Tag className={classes[risk as unknown as keyof typeof classes]}>
              {risk}
            </Tag>
          )
        : (
            <Tag>N/A</Tag>
          );
    },
  }, {
    header: t('tca'),
    renderCell: ({ tca_time }) => tca_time ? dayjs(tca_time).format(FORMAT_DATE_TIME) : 'Unknown',
  }, {
    header: t('poc'),
    accessorKey: 'collision_probability',
    renderCell: ({ collision_probability }) => collision_probability ? roundedPercent(collision_probability) : '-',
  }, {
    header: t('manoeuvre_expected'),
    renderCell: ({ manoeuvre_expected }) => `${manoeuvre_expected ? `${manoeuvre_expected}. ` : ''}${manoeuvreComment}`,
  }, {
    header: t('primary_object'),
    renderCell: ({ primary_object_common_name, primary_object_norad_id }) => (
      <Link className="govuk-link" href={`/satellites/${primary_object_norad_id}`}>
        {primary_object_common_name}
      </Link>
    ),
  }, {
    header: t('licensing_country'),
    cellProps: { className: 'pl-10' },
    renderCell: ({ primary_object_licensing_country }) => getFullCountry(primary_object_licensing_country),
  }, {
    header: t('object_type'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'primary_object_type',
  }, {
    header: t('mass'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'primary_object_mass',
  }, {
    header: t('manoeuvrable'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'primary_object_manoeuvrable',
  }, {
    header: t('norad_id'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'primary_object_norad_id',
  }, {
    header: t('object_mission'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'primary_object_mission',
  }, {
    header: t('secondary_object'),
    renderCell: ({ secondary_object_common_name, secondary_object_norad_id }) => (
      <Link className="govuk-link" href={`/satellites/${secondary_object_norad_id}`}>
        {secondary_object_common_name}
      </Link>
    ),
  }, {
    header: t('licensing_country'),
    cellProps: { className: 'pl-10' },
    renderCell: ({ secondary_object_licensing_country }) => getFullCountry(secondary_object_licensing_country),
  }, {
    header: t('object_type'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'secondary_object_type',
  }, {
    header: t('mass'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'secondary_object_mass',
  }, {
    header: t('manoeuvrable'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'secondary_object_manoeuvrable',
  }, {
    header: t('norad_id'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'secondary_object_norad_id',
  }, {
    header: t('object_mission'),
    cellProps: { className: 'pl-10' },
    accessorKey: 'secondary_object_mission',
  }];

  return <InformationsTable rows={rows} data={report} />;
};

export { ConjunctionAlertExecutiveSummaryTable };
