import { useTranslations } from 'next-intl';

type OrganisationConjunctionEventsByTypeProps = {
  organisationName: string;
};

const OrganisationConjunctionEventsByType = ({
  organisationName,
}: OrganisationConjunctionEventsByTypeProps) => {
  const t = useTranslations('Organisation.conjunction_type');

  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        {t('description', { organisationName })}
      </p>
      {/* TODO: No backend stats endpoint exists for the conjunction-events-by-type breakdown
          (events with debris / another satellite / two UK-licensed satellites / other objects). */}
      <p className="govuk-body">{t('no_data')}</p>
    </div>
  );
};

export { OrganisationConjunctionEventsByType };
