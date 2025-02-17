import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { MonitoringOrganisationsAndUsers } from './MonitoringOrganisationsAndUsers';

const MonitoringServiceUsageAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.service_usage_accordion');

  return (
    <>
      <h2 className="govuk-heading-l" id="serviceUsageAccordionTitle">{t('title')}</h2>
      <Accordion
        id="service-usage-accordion"
        initialItems={[
          {
            id: 'organisationsAndUsers',
            heading: t('organisations_and_users.title'),
            content: <MonitoringOrganisationsAndUsers />,
          },
        ]}
      />
    </>
  );
};

export { MonitoringServiceUsageAccordion };
