'use client';

import { useTranslations } from 'next-intl';

import type { TypeAlertSettingsDistributionList } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import Accordion from '@/ui/accordion/accordion';

import { getDistributionListColumns } from './columns';

type DistributionListAccordionsProps = {
  alerts: TypeAlertSettingsDistributionList[];
};

const DistributionListAccordions = ({ alerts }: DistributionListAccordionsProps) => {
  const t = useTranslations('Accordions.DistributionLists');

  const columns = getDistributionListColumns();

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
              <DataTable data={alerts.filter(alert => alert.conjunction_alert_settings?.chosen_option === 'all')} columns={columns} />
            ),
          },
          {
            id: 'only-priority-conjunctions',
            heading: t('receive_alerts', { item: 'only priority conjunction' }),
            content: (
              <DataTable data={alerts.filter(alert => alert.conjunction_alert_settings?.chosen_option === 'priority')} columns={columns} />
            ),
          },
        ]}
      />

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
              <DataTable data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_option === 'all')} columns={columns} />
            ),
          },
          {
            id: 'only-uk-re-entries',
            heading: t('receive_alerts', { item: 'only for UK satellites' }),
            content: (
              <DataTable data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_option === 'uk_satellites_only')} columns={columns} />
            ),
          },
          {
            id: 'only-priority-re-entries',
            heading: t('receive_alerts', { item: 'only priority re-entry' }),
            content: (
              <DataTable data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_option === 'priority')} columns={columns} />
            ),
          },
        ]}
      />
    </>
  );
};

export { DistributionListAccordions };
