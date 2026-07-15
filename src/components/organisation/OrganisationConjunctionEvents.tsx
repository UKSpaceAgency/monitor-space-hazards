import type { TypeEpoch, TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
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
  const resolvedEpoch = epoch ?? 'future';
  const params: TypeGetConjunctionEventsListParams = {
    organization_id: organisationId,
    epoch: resolvedEpoch,
    sort_by: 'tca_time',
    sort_order: resolvedEpoch === 'past' ? 'desc' : 'asc',
    limit: 50,
  };
  const events = await getConjunctionEventsList(params);

  return (
    <OrganisationConjunctionsDataTable
      initialData={events}
      params={params}
      epoch={epoch}
      organisationName={organisationName}
    />
  );
};

export { OrganisationConjunctionEvents };
