import { getTranslations } from 'next-intl/server';

import type { TypeGetConjunctionEventsParams } from '@/__generated__/data-contracts';
import { getConjunctionEventsList } from '@/actions/getConjunctionEventsList';
import { getSession } from '@/actions/getSession';
import Details from '@/ui/details/details';
import { isAgencyUser, isAnalysist, isGovUser } from '@/utils/Roles';

import { DashboardConjunctionsDataTable } from './data-table/DashboardConjunctionsDataTable';

const params: TypeGetConjunctionEventsParams = {
  limit: 5,
};

const DashboardConjunctions = async () => {
  const t = await getTranslations('Conjunctions');
  const data = await getConjunctionEventsList(params);
  const session = await getSession();

  if (!data.length) {
    return null;
  }

  return (
    <div>
      <h2 className="govuk-heading-m pb-5 mb-8 border-b border-midGrey">{t('title')}</h2>
      <DashboardConjunctionsDataTable data={data} isAnalyst={isAnalysist(session?.user.role)} haveAccessToAlerts={isAgencyUser(session?.user.role) || isGovUser(session?.user.role)} />
      <Details summary={t.rich('help2.title')}>
        {t.rich('help2.content')}
      </Details>
    </div>
  );
};

export { DashboardConjunctions };
