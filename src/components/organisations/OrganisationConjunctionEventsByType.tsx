// TODO: This section requires a new backend endpoint that breaks down conjunction events by type
// (debris / another satellite / two UK-licensed satellites / other objects) per satellite.
// No such endpoint currently exists in GET /v1/stats/. Once available, implement similarly to
// OrganisationConjunctionEventsByPoC using getStatsConjunctionEventsByType({ organization_id }).

type OrganisationConjunctionEventsByTypeProps = {
  organisationName: string;
};

const OrganisationConjunctionEventsByType = ({
  organisationName,
}: OrganisationConjunctionEventsByTypeProps) => {
  return (
    <div>
      <p className="govuk-!-font-weight-bold">
        Total number of conjunction events involving
        {' '}
        {organisationName}
        &apos;s UK-licensed satellites and a breakdown of their type.
      </p>
      <p className="govuk-body govuk-hint">
        This breakdown (events with debris / another satellite / two UK-licensed satellites / other objects) is not yet available.
        A new backend stats endpoint is required to support this view.
      </p>
    </div>
  );
};

export { OrganisationConjunctionEventsByType };
