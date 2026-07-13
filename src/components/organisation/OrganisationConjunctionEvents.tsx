import type { TypeEpoch } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';

import { OrganisationConjunctionsDataTable } from './data-table/OrganisationConjunctionsDataTable';

type OrganisationConjunctionEventsProps = {
  organisationId: string;
  organisationName: string;
  epoch?: TypeEpoch;
};

const OrganisationConjunctionEvents = async ({
  organisationId,
  organisationName,
  epoch,
}: OrganisationConjunctionEventsProps) => {
  const events = await getConjunctionEventsList({ organization_id: organisationId, epoch: epoch ?? 'future', limit: 50 });

  return (
    <OrganisationConjunctionsDataTable
      initialData={events}
      epoch={epoch}
      organisationName={organisationName}
    />
  );
};

export { OrganisationConjunctionEvents };
