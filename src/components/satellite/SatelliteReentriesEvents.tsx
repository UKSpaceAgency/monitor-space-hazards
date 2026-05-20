import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { getReentryEventsByNoradId } from '@/actions/getReentryEventsByNoradId';
import { getSession } from '@/actions/getSession';
import { ReentriesDataTable } from '@/components/re-entries/data-table/ReentriesDataTable';
import { isSatteliteUser } from '@/utils/Roles';

type SatelliteReentriesEventsProps = {
  noradId: string;
};

const SatelliteReentriesEvents = async ({ noradId }: SatelliteReentriesEventsProps) => {
  const session = await getSession();
  const initialData = await getReentryEventsByNoradId(noradId);
  const params: TypeGetReentryEventsParams = {
    search_like: noradId,
    sort_by: 'decay_epoch',
    sort_order: 'desc',
    limit: 50,
  };

  return (
    <div className="mb-12">
      <ReentriesDataTable
        initialData={initialData}
        params={params}
        haveAccessToAlerts={!isSatteliteUser(session?.user.role)}
      />
    </div>
  );
};

export { SatelliteReentriesEvents };
