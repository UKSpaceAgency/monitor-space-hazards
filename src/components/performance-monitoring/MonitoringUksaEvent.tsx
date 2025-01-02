import { getTranslations } from 'next-intl/server';

import Details from '@/ui/details/details';

import { MonitoringUksaEventContent } from './MonitoringUksaEventContent';

const MonitoringUksaEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  return (
    <>
      <MonitoringUksaEventContent />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </>
  );
};

export { MonitoringUksaEvent };
