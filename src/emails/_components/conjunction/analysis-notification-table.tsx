import { createTranslator } from 'next-intl';

import type { TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';
import { displayExponential } from '@/utils/Math';

import { DataTable } from '../data-table';
import { Link } from '../link';

type AnalysisNotificationTableProps = {
  conjunctions: TypeUniqueEventOut[];
};

const AnalysisNotificationTable = ({ conjunctions }: AnalysisNotificationTableProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Analysis_notification_table',
    messages,
  });

  const url = `${env.NEXTAUTH_URL}/conjunctions`;

  const data = conjunctions.map(conjunction => [
    <Link key={conjunction.short_id} href={`${url}/${conjunction.short_id}`}>
      {conjunction.primary_object_common_name}
      {' '}
      vs
      {' '}
      {conjunction.secondary_object_common_name}
    </Link>,
    dayjs(conjunction.tca).format(FORMAT_FULL_DATE_TIME_WITH_UTC),
    conjunction.collision_probability_uksa ? displayExponential(conjunction.collision_probability_uksa, 4) : '-',
  ]);
  return <DataTable headers={[t('objects'), t('tca'), t('poc')]} data={data} className="pb-6" />;
};

export default AnalysisNotificationTable;
