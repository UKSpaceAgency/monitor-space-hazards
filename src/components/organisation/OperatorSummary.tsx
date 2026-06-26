import { useTranslations } from 'next-intl';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import SummaryList from '@/ui/summary-list/summary-list';

type OperatorSummaryProps = {
  organisation: TypeOrganizationOut;
};

const OperatorSummary = ({ organisation }: OperatorSummaryProps) => {
  const t = useTranslations('Organisation.operator_summary');
  const emailContact = organisation.email_domain
    ? `operations@${organisation.email_domain}`
    : t('fallback_email');

  return (
    <div className="mb-10">
      <h2 data-anchor="organisation-summary" className="govuk-heading-l">{t('title')}</h2>
      <SummaryList
        rows={[
          {
            key: {
              children: t('primary_country_of_operation'),
              className: 'md:w-1/2',
            },
            value: {
              // TODO: TypeOrganizationOut has no country field. Static value until the backend exposes it.
              children: t('primary_country_of_operation_value'),
            },
          },
          {
            key: {
              children: t('uk_licensed_satellites'),
              className: 'md:w-1/2',
            },
            value: {
              children: organisation.satellites_count,
            },
          },
          {
            key: {
              children: t('telephone_number'),
              className: 'md:w-1/2',
            },
            value: {
              // TODO: TypeOrganizationOut has no telephone field. Show NO DATA until the backend exposes it.
              children: t('no_data'),
            },
          },
          {
            key: {
              children: t('email_contacts'),
              className: 'md:w-1/2',
            },
            value: {
              children: emailContact,
            },
          },
        ]}
      />
    </div>
  );
};

export { OperatorSummary };
