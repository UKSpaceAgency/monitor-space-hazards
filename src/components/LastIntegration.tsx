import { getTranslations } from 'next-intl/server';

import Api from '@/libs/Api';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';

const LastIntegration = async () => {
  const t = await getTranslations('Components.Last_integration');

  const { data } = await Api.getExternalDataPerformance({
    limit: 1,
    sort_order: 'desc',
  });

  const ingestionStart = data.length ? data[0]?.ingestion_start : null;

  return ingestionStart
    ? (
        <InsetText>
          {t('text', {
            date: dayjs(ingestionStart).format(FORMAT_DATE_TIME),
          })}
        </InsetText>
      )
    : null;
};

export { LastIntegration };
