import { useTranslations } from 'next-intl';

import SummaryList from '@/ui/summary-list/summary-list';

type OrganisationSummaryProps = {
  satellites: number;
  users: number;
};

const OrganisationSummary = ({ satellites, users }: OrganisationSummaryProps) => {
  const t = useTranslations('Organisation.summary');

  return (
    <div>
      <h2 className="govuk-heading-l">{t('operator_information')}</h2>
      <SummaryList
        rows={[
          {
            key: {
              className: 'md:w-2/3',
              children: t('uk_satellites'),
            },
            value: {
              children: <span className="md:block text-right">{satellites}</span>,
            },
          },
          {
            key: {
              children: t('users'),
            },
            value: {
              children: <span className="md:block text-right">{users}</span>,
            },
          },
        ]}
      />
    </div>
  );
};

export { OrganisationSummary };
