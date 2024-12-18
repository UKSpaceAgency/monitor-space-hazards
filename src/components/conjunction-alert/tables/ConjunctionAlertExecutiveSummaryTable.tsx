import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

type ConjunctionAlertExecutiveSummaryTableProps = {
  event: TypeUniqueEventOut;
  report: TypeConjunctionReportOut;
};

const ConjunctionAlertExecutiveSummaryTable = ({ event, report }: ConjunctionAlertExecutiveSummaryTableProps) => {
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
    renderCell: ({ tcaTime }) => tcaTime ? dayjs(tcaTime).format(FORMAT_DATE_TIME) : 'Unknown',
  }, {
    header: t('poc'),
    accessorKey: 'collisionProbability',
    renderCell: ({ collisionProbability }) => collisionProbability ? roundedPercent(collisionProbability) : '-',
  }, {
    // TO CONFIRM
    header: t('manoeuvre_expected'),
    renderCell: () => event.manoeuvreAddition,
  }, {
    header: t('primary_object'),
    renderCell: ({ primaryObjectCommonName, primaryObjectNoradId }) => (
      <Link className="govuk-link" href={`/satellites/${primaryObjectNoradId}`}>
        {primaryObjectCommonName}
      </Link>
    ),
  }, {
    header: t('licensing_country'),
    cellProps: { className: 'indent-10' },
    renderCell: ({ primaryObjectLicensingCountry }) => getFullCountry(primaryObjectLicensingCountry),
  }, {
    header: t('object_type'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'primaryObjectType',
  }, {
    header: t('mass'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'primaryObjectMass',
  }, {
    header: t('manoeuvrable'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'primaryObjectManoeuvrable',
  }, {
    header: t('norad_id'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'primaryObjectNoradId',
  }, {
    header: t('secondary_object'),
    renderCell: ({ secondaryObjectCommonName, secondaryObjectNoradId }) => (
      <Link className="govuk-link" href={`/satellites/${secondaryObjectNoradId}`}>
        {secondaryObjectCommonName}
      </Link>
    ),
  }, {
    header: t('licensing_country'),
    cellProps: { className: 'indent-10' },
    renderCell: ({ secondaryObjectLicensingCountry }) => getFullCountry(secondaryObjectLicensingCountry),
  }, {
    header: t('object_type'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'secondaryObjectType',
  }, {
    header: t('mass'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'secondaryObjectMass',
  }, {
    header: t('manoeuvrable'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'secondaryObjectManoeuvrable',
  }, {
    header: t('norad_id'),
    cellProps: { className: 'indent-10' },
    accessorKey: 'secondaryObjectNoradId',
  }];

  return <InformationsTable rows={rows} data={report} />;
};

export { ConjunctionAlertExecutiveSummaryTable };
