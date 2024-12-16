import { useTranslations } from 'next-intl';

import type { TypeAlertSettingsDistributionList } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import Accordion from '@/ui/accordion/accordion';
import Details from '@/ui/details/details';

import { distributionListColumns } from './columns';

type DistributionListAccordionsProps = {
  alerts: TypeAlertSettingsDistributionList[];
};

const DistributionListAccordions = ({ alerts }: DistributionListAccordionsProps) => {
  const t = useTranslations('Accordions.DistributionLists');

  return (
    <>
      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 'conjunction' })}
      </h2>

      <Accordion
        id="conjunction-list"
        initialItems={[
          {
            id: 'all-conjunction',
            heading: t('receive_alerts', { item: 'all conjunction' }),
            content: (
              <div className="overflow-auto">
                <DataTable
                  data={alerts.filter(alert => alert.conjunction_alert_settings?.chosen_option === 'all')}
                  columns={distributionListColumns}
                  largerText
                />
              </div>
            ),
          },
          {
            id: 'only-priority-conjunctions',
            heading: t('receive_alerts', { item: 'only priority conjunction' }),
            content: (
              <div className="overflow-auto">
                <DataTable
                  data={alerts.filter(alert => alert.conjunction_alert_settings?.chosen_option === 'priority')}
                  columns={distributionListColumns}
                  largerText
                />
              </div>
            ),
          },
        ]}
      />

      <Details summary={t('conjunctions_help.summary')}>
        {t.rich('conjunctions_help.content')}
      </Details>

      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 're-entry' })}
      </h2>

      <Accordion
        id="re-entries-list"
        initialItems={[
          {
            id: 'all-re-entries',
            heading: t('receive_alerts', { item: 'all re-entry' }),
            content: (
              <div className="overflow-auto">
                <DataTable
                  data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_option === 'all')}
                  columns={distributionListColumns}
                  largerText
                />
              </div>
            ),
          },
          {
            id: 'only-uk-re-entries',
            heading: t('receive_alerts', { item: 'only for UK satellites' }),
            content: (
              <div className="overflow-auto">
                <DataTable
                  data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_option === 'uk_satellites_only')}
                  columns={distributionListColumns}
                  largerText
                />
              </div>
            ),
          },
          {
            id: 'only-priority-re-entries',
            heading: t('receive_alerts', { item: 'only priority re-entry' }),
            content: (
              <div className="overflow-auto">
                <DataTable
                  data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_option === 'priority')}
                  columns={distributionListColumns}
                  largerText
                />
              </div>
            ),
          },
        ]}
      />

      <Details summary={t('reentry_help.summary')}>
        {t.rich('reentry_help.content')}
      </Details>
    </>
  );
};

export { DistributionListAccordions };
