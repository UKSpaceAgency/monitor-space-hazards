'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { publicSatellitesColumns } from './OrganisationSatellitesPublicTableColumns';

type OrganisationSatellitesPublicTableProps = {
  satellites: TypeSatelliteWithMetadataOut[];
};

const OrganisationSatellitesPublicTable = ({
  satellites,
}: OrganisationSatellitesPublicTableProps) => {
  const t = useTranslations('Tables.Organisation_public_satellites');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return satellites;
    }
    const lower = search.toLowerCase();
    return satellites.filter(
      s =>
        s.common_name.toLowerCase().includes(lower)
        || (s.norad_id && s.norad_id.toLowerCase().includes(lower)),
    );
  }, [satellites, search]);

  const downloadAction = async () => satellites;

  return (
    <div>
      <div className="govuk-form-group mb-4">
        <label className="govuk-label govuk-!-font-weight-bold" htmlFor="satellite-search">
          {t('find_satellite_label')}
        </label>
        <input
          className="govuk-input"
          id="satellite-search"
          type="search"
          placeholder={t('search_placeholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-auto max-h-[500px]">
        <DataTable<TypeSatelliteWithMetadataOut>
          data={filtered}
          columns={publicSatellitesColumns}
          enableSorting={false}
          emptyLabel={t('empty')}
        />
      </div>
      <DownloadData
        type={t('download_type')}
        params={{}}
        downloadAction={downloadAction}
        ariaLabel={t('download_aria')}
      />
    </div>
  );
};

export { OrganisationSatellitesPublicTable };
