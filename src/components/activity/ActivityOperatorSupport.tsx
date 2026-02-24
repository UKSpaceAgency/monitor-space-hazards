import type { InformationsTableRow } from '../InformationsTable';
import { InformationsTable } from '../InformationsTable';

type ActivityOperatorSupportData = {
  licensee: string;
  primaryContact: string;
  telephoneNumber: string;
  emailContacts: string;
};

const ActivityOperatorSupport = () => {
  const data: ActivityOperatorSupportData = {
    licensee: 'Inmarsat',
    primaryContact: 'Satellite Control Centre',
    telephoneNumber: '+44(0)7912277788',
    emailContacts: 'scc.controllers@inmarsat.com',
  };

  const baseInformations: InformationsTableRow<ActivityOperatorSupportData>[] = [{
    header: 'Licensee',
    accessorKey: 'licensee',
  }, {
    header: 'Primary contact',
    accessorKey: 'primaryContact',
  }, {
    header: 'Telephone number',
    accessorKey: 'telephoneNumber',
  }, {
    header: 'Email contacts',
    accessorKey: 'emailContacts',
  }];

  return (
    <div>
      <InformationsTable rows={baseInformations} data={data} />
    </div>
  );
};

export { ActivityOperatorSupport };
