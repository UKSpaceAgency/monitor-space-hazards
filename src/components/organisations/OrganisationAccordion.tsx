import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeOrganizationOut } from '@/__generated__/data-contracts';
import { getStatsEventsBySatelliteForOrg } from '@/actions/getStatsEventsBySatelliteForOrg';
import Accordion from '@/ui/accordion/accordion';

import { OrganisationActivitySection } from './OrganisationActivitySection';
import { OrganisationConjunctionEvents } from './OrganisationConjunctionEvents';
import { OrganisationConjunctionEventsByPoC } from './OrganisationConjunctionEventsByPoC';
import { OrganisationConjunctionEventsByType } from './OrganisationConjunctionEventsByType';
import { OrganisationSatellitesList } from './OrganisationSatellitesList';

type OrganisationAccordionProps = {
  organisation: TypeOrganizationOut;
  epoch?: TypeEpoch;
};

const OrganisationAccordion = async ({
  organisation,
  epoch,
}: OrganisationAccordionProps) => {
  const t = await getTranslations('Organisation.accordion');

  const pocStats = organisation.id
    ? await getStatsEventsBySatelliteForOrg(organisation.id)
    : [];

  return (
    <>
      <h2 data-anchor="satellites" className="govuk-heading-l">
        {t('licensed_satellites')}
      </h2>
      <Accordion
        id="organisation-satellites"
        addAnchor={false}
        initialItems={[
          {
            id: 'licensed_satellites',
            heading: t('licensed_satellites'),
            content: <OrganisationSatellitesList organisationId={organisation.id} />,
          },
        ]}
      />

      <h2 data-anchor="conjunction-events" className="govuk-heading-l">
        {t('conjunction_events_heading')}
      </h2>
      <Accordion
        id="conjunction-events"
        addAnchor={false}
        initialItems={[
          {
            id: 'all_conjunction_events',
            heading: t('all_conjunction_events'),
            content: organisation.id
              ? (
                  <OrganisationConjunctionEvents
                    organisationId={organisation.id}
                    organisationName={organisation.name}
                    epoch={epoch}
                  />
                )
              : <p className="govuk-body">No organisation data available.</p>,
          },
          {
            id: 'conjunction_events_by_poc',
            heading: t('conjunction_events_by_poc'),
            content: (
              <OrganisationConjunctionEventsByPoC
                stats={pocStats}
                organisationName={organisation.name}
              />
            ),
          },
          {
            id: 'conjunction_events_by_type',
            heading: t('conjunction_events_by_type'),
            content: (
              <OrganisationConjunctionEventsByType
                organisationName={organisation.name}
              />
            ),
          },
        ]}
      />

      <h2 data-anchor="activity-information" className="govuk-heading-l">
        {t('activity_information_heading')}
      </h2>
      <Accordion
        id="activity-events"
        addAnchor={false}
        initialItems={[
          {
            id: 'all_activity_flags',
            heading: t('all_activity_flags'),
            content: organisation.id
              ? (
                  <OrganisationActivitySection
                    organisationId={organisation.id}
                    organisationName={organisation.name}
                    section="all"
                  />
                )
              : <p className="govuk-body">No organisation data available.</p>,
          },
          {
            id: 'activity_flags_by_reason',
            heading: t('activity_flags_by_reason'),
            content: organisation.id
              ? (
                  <OrganisationActivitySection
                    organisationId={organisation.id}
                    organisationName={organisation.name}
                    section="by_reason"
                  />
                )
              : <p className="govuk-body">No organisation data available.</p>,
          },
        ]}
      />
    </>
  );
};

export { OrganisationAccordion };
