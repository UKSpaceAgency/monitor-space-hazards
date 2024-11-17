import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type AdditionalInformations = Pick<TypeSatelliteOut, 'shape' | 'mass' | 'crossSectionAvg' | 'crossSectionMax' | 'crossSectionMin' | 'height' | 'width' | 'depth' | 'span' | 'diameter'>;

type AdditionalInformationsTableProps = {
  object: AdditionalInformations | AdditionalInformations[];
};

const AdditionalInformationsTable = ({ object }: AdditionalInformationsTableProps) => {
  const t = useTranslations('Tables.SatelliteInformations');

  const baseInformations: InformationsTableRow<AdditionalInformations>[] = [{
    header: t('Additional.shape'),
    accessorKey: 'shape',
  }, {
    header: t('Additional.mass'),
    accessorKey: 'mass',
  }, {
    header: t('Additional.cross_section_avg'),
    accessorKey: 'crossSectionAvg',
  }, {
    header: t('Additional.cross_section_max'),
    accessorKey: 'crossSectionMax',
  }, {
    header: t('Additional.cross_section_min'),
    accessorKey: 'crossSectionMin',
  }, {
    header: t('Additional.height'),
    accessorKey: 'height',
  }, {
    header: t('Additional.width'),
    accessorKey: 'width',
  }, {
    header: t('Additional.depth'),
    accessorKey: 'depth',
  }, {
    header: t('Additional.span'),
    accessorKey: 'span',
  }, {
    header: t('Additional.diameter'),
    accessorKey: 'diameter',
  }];

  return <InformationsTable rows={baseInformations} data={object} />;
};

export { AdditionalInformationsTable };
