import { createTranslator } from 'next-intl';

import type { TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
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
    <Link key={conjunction.shortId} href={`${url}/${conjunction.shortId}`}>
      {conjunction.primaryObjectCommonName}
      {' '}
      vs
      {' '}
      {conjunction.secondaryObjectCommonName}
    </Link>,
    dayjs(conjunction.tca).format(FORMAT_FULL_DATE_TIME),
    conjunction.collisionProbabilityUksa ? displayExponential(conjunction.collisionProbabilityUksa, 4) : '-',
  ]);
  return <DataTable headers={[t('objects'), t('tca'), t('poc')]} data={data} className="pb-6" />;
};

export default AnalysisNotificationTable;
