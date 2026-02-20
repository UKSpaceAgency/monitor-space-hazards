import { useTranslations } from 'next-intl';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import SummaryList from '@/ui/summary-list/summary-list';

type OrganisationsSummaryProps = {
  organisations: TypeOrganizationOut[];
};

const OrganisationsSummary = ({ organisations }: OrganisationsSummaryProps) => {
  const t = useTranslations('Organisations.summary');

  return (
    <SummaryList
      rows={[
        {
          key: {
            children: t('total_orgs'),
          },
          value: {
            children: <span className="block text-right">{organisations.length}</span>,
          },
        },
        {
          key: {
            children: t('total_sats'),
          },
          value: {
            children: <span className="block text-right">{organisations.reduce((acc, curr) => acc + curr.satellites_count, 0)}</span>,
          },
        },
      ]}
    />
  );
};

export { OrganisationsSummary };
