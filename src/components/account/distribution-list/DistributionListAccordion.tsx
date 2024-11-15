'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeAlertSettingsDistributionList } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import type { TranslatedColumnDef } from '@/types';
import Accordion from '@/ui/accordion/accordion';

const DistributionListAccordion = () => {
  const t = useTranslations('Accordions.DistributionLists');

  const columns: TranslatedColumnDef<TypeAlertSettingsDistributionList>[] = [
    {
      accessorKey: 'name',
      id: 'name',
      header: 'Name',
      enableSorting: false,
      cell: ({ row }) =>
        `${row.original.first_name} ${row.original.last_name}`,
    },
    {
      accessorKey: 'email',
      id: 'email',
      header: 'Email',
      enableSorting: false,
    },
    {
      accessorKey: 'organizationName',
      id: 'organizationName',
      header: 'Organisation/department',
      enableSorting: false,
    },
    {
      accessorKey: 'phoneNumber:',
      id: 'phoneNumber:',
      enableSorting: false,
      header: 'Phone number',
    },
    {
      id: 'userId',
      accessorKey: `userId`,
      enableSorting: false,
      header: () => <span style={{ visibility: 'hidden' }}>Action</span>,
      cell: ({ getValue }: any) => (
        <Link
          href={`/account/alert-settings/${getValue() as string}`}
          className="govuk-link"
        >
          Edit
        </Link>
      ),
    },
  ];

  return (
    <Accordion
      id="conjunction-list"
      initialItems={[
        {
          id: 'all-conjunctions',
          heading: t('receive_alerts', { item: 'all conjunctions' }),
          content: (
            <DataTable data={[]} columns={columns} />
          ),
        },
        {
          id: 'only-priority',
          heading: t('receive_alerts', { item: 'only priority conjunction' }),
          content: (
            <DataTable data={[]} columns={columns} />
          ),
        },
      ]}
    />
  );
};

export { DistributionListAccordion };
