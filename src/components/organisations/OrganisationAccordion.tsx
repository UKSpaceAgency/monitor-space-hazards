import { getTranslations } from 'next-intl/server';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { OrganisationSatellitesList } from './OrganisationSatellitesList';

type OrganisationAccordionProps = {
  organisation: TypeOrganizationOut;
};

const OrganisationAccordion = async ({ organisation }: OrganisationAccordionProps) => {
  const t = await getTranslations('Organisation.accordion');

  return (
    <>
      <h2 data-anchor="satellites" className="govuk-heading-l">{t('licensed_satellites')}</h2>
      <Accordion
        id="reentry-event-details"
        addAnchor={false}
        initialItems={[
          {
            id: 'licensed_satellites',
            heading: t('licensed_satellites'),
            content: <OrganisationSatellitesList organisationId={organisation.id} />,
          },
        ]}
      />
    </>
  );
};

export { OrganisationAccordion };
