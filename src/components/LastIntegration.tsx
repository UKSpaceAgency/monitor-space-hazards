import { getTranslations } from 'next-intl/server';

import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';

const LastIntegration = async () => {
  const t = await getTranslations('Components.Last_integration');

  const { data } = await Api.getExternalDataPerformance({
    limit: 1,
    sort_order: 'desc',
  });

  const ingestionStart = data.length ? data[0]?.ingestionStart : null;

  return ingestionStart
    ? (
        <InsetText>
          {t('text', {
            date: dayjs(ingestionStart).format('DD/MM/YY HH:mm:ss'),
          })}
        </InsetText>
      )
    : null;
};

export { LastIntegration };
