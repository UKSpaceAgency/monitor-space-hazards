import { useTranslations } from 'next-intl';

import type { TypeAlertSettingsDistributionListOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';
import Details from '@/ui/details/details';

import { DistributionListTable } from './DistributionListTable';

type DistributionListAccordionsProps = {
  alerts: TypeAlertSettingsDistributionListOut[];
};

const DistributionListAccordions = ({ alerts }: DistributionListAccordionsProps) => {
  const t = useTranslations('Distribution_lists.accordion');

  return (
    <>
      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 're-entry' })}
      </h2>
      <Accordion
        id="re-entries-list"
        initialItems={[
          {
            id: 'all-re-entries',
            heading: t('receive_alerts_standard', { type: 're-entry' }),
            content: <DistributionListTable data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_options?.includes('standard'))} />,
          },
          {
            id: 'only-priority-re-entries',
            heading: t('receive_alerts_priority', { type: 're-entry' }),
            content: <DistributionListTable data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_options?.includes('priority'))} />,
          },
          {
            id: 'only-uk-re-entries',
            heading: t('receive_alerts_uk_satellites_only'),
            content: <DistributionListTable data={alerts.filter(alert => alert.reentry_alert_settings?.chosen_options?.includes('uk-licensed'))} />,
          },
        ]}
      />
      <Details summary={t.rich('reentry_help.summary')}>
        {t.rich('reentry_help.content')}
      </Details>
      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 'fragmentation' })}
      </h2>
      <Accordion
        id="fragmentation-list"
        initialItems={[
          {
            id: 'all-fragmentation',
            heading: t('receive_alerts_standard', { type: 'fragmentation' }),
            content: <DistributionListTable data={alerts.filter(alert => alert.fragmentation_alert_settings?.chosen_options?.includes('standard'))} />,
          },
          {
            id: 'only-priority-fragmentation',
            heading: t('receive_alerts_priority', { type: 'fragmentation' }),
            content: <DistributionListTable data={alerts.filter(alert => alert.fragmentation_alert_settings?.chosen_options?.includes('priority'))} />,
          },
        ]}
      />
      <Details summary={t.rich('fragmentation_help.summary')}>
        {t.rich('fragmentation_help.content')}
      </Details>
      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 'conjunction' })}
      </h2>
      <Accordion
        id="conjunction-list"
        initialItems={[
          {
            id: 'all-conjunction',
            heading: t('receive_alerts_standard', { type: 'conjunction' }),
            content: <DistributionListTable data={alerts.filter(alert => alert.conjunction_alert_settings?.chosen_options?.includes('standard'))} />,
          },
          {
            id: 'only-priority-conjunctions',
            heading: t('receive_alerts_priority', { type: 'conjunction' }),
            content: <DistributionListTable data={alerts.filter(alert => alert.conjunction_alert_settings?.chosen_options?.includes('priority'))} />,
          },
        ]}
      />
      <Details summary={t.rich('conjunctions_help.summary')}>
        {t.rich('conjunctions_help.content')}
      </Details>
    </>
  );
};

export { DistributionListAccordions };
