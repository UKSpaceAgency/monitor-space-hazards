import { getTranslations } from 'next-intl/server';

import type { TypeGetReentryEventsParams } from '@/__generated__/data-contracts';
import { getReentryEvents } from '@/actions/getReentryEvents';
import { getSession } from '@/actions/getSession';
import { isSatteliteUser } from '@/utils/Roles';

import { ReentriesAlertsDataTable } from './data-table/ReentriesAlertsDataTable';

const params: TypeGetReentryEventsParams = {
  report: 'present',
};

const ReentriesAlertsTable = async () => {
  const t = await getTranslations('Reentries');
  const data = await getReentryEvents(params);
  const session = await getSession();

  if (!data.length) {
    return <p className="govuk-body">{t('no_upcoming_alerts')}</p>;
  }

  return (
    <ReentriesAlertsDataTable data={data} haveAccessToAlerts={!isSatteliteUser(session?.user.role)} />
  );
};

export { ReentriesAlertsTable };
