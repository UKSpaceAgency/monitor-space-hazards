import { isNumber } from 'lodash';
import { createTranslator } from 'next-intl';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';
import { displayExponential } from '@/utils/Math';

import { DataTable } from '../data-table';
import { Link } from '../link';

type ConjunctionNotificationTableProps = {
  conjunctions: TypeEventOut[];
  isAnalysis?: boolean;
};

const ConjunctionNotificationTable = ({ conjunctions, isAnalysis }: ConjunctionNotificationTableProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: isAnalysis ? 'Emails.Analysis_notification_table' : 'Emails.Conjunction_notification_table',
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
    dayjs(conjunction.tcaTime).format(FORMAT_FULL_DATE_TIME_WITH_UTC),
    isNumber(conjunction.collisionProbability) ? displayExponential(conjunction.collisionProbability, 4) : 'Unknown',
  ]);
  return <DataTable headers={[t('objects'), t('tca'), t('poc')]} data={data} className="pb-6" />;
};

export default ConjunctionNotificationTable;
