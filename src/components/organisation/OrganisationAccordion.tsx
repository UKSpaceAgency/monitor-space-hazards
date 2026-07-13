import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeOrganizationOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { OrganisationConjunctionEvents } from './OrganisationConjunctionEvents';
import { OrganisationConjunctionEventsByPoCSection } from './OrganisationConjunctionEventsByPoCSection';
import { OrganisationConjunctionEventsByTypeSection } from './OrganisationConjunctionEventsByTypeSection';
import { OrganisationSatellitesList } from './OrganisationSatellitesList';

type OrganisationAccordionProps = {
  organisation: TypeOrganizationOut;
  epoch?: TypeEpoch;
  searchLike?: string;
};

const OrganisationAccordion = async ({
  organisation,
  epoch,
  searchLike,
}: OrganisationAccordionProps) => {
  const t = await getTranslations('Organisation.accordion');

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
            content: (
              <OrganisationSatellitesList
                organisationId={organisation.id}
                searchLike={searchLike}
              />
            ),
          },
        ]}
      />

      <h2 data-anchor="conjunction-events" className="govuk-heading-l">
        {t('conjunction_events_heading')}
      </h2>
      <Accordion
        id="conjunction-events"
        dynamic
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
              : <p className="govuk-body">{t('no_organisation_data')}</p>,
          },
          {
            id: 'conjunction_events_by_poc',
            heading: t('conjunction_events_by_poc'),
            content: organisation.id
              ? (
                  <OrganisationConjunctionEventsByPoCSection
                    organisationId={organisation.id}
                    organisationName={organisation.name}
                  />
                )
              : <p className="govuk-body">{t('no_organisation_data')}</p>,
          },
          {
            id: 'conjunction_events_by_type',
            heading: t('conjunction_events_by_type'),
            content: organisation.id
              ? (
                  <OrganisationConjunctionEventsByTypeSection
                    organisationId={organisation.id}
                    organisationName={organisation.name}
                  />
                )
              : <p className="govuk-body">{t('no_organisation_data')}</p>,
          },
        ]}
      />
      {/*
      <h2 data-anchor="activity-information" className="govuk-heading-l">
        {t('activity_information_heading')}
      </h2>
      <Accordion
        id="activity-events"
        dynamic
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
              : <p className="govuk-body">{t('no_organisation_data')}</p>,
          },
        ]}
      /> */}
    </>
  );
};

export { OrganisationAccordion };
