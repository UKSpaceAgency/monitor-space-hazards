import { getTranslations } from 'next-intl/server';

import type { TypeEpoch, TypeReportFlagSettings, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { getEphemerises } from '@/actions/getEphemerises';
import { getSession } from '@/actions/getSession';
import Accordion from '@/ui/accordion/accordion';
import { isAgencyApprover, isAgencyUser, isRegulatorUser, isSatteliteOperator } from '@/utils/Roles';

import { SatelliteActivityEvents } from './SatelliteActivityEvents';
import { SatelliteAdditionalInformations } from './SatelliteAdditionalInformation';
import { SatelliteConjunctionEvents } from './SatelliteConjunctionEvents';
import { SatelliteEphemerisData } from './SatelliteEphemerisData';
import { SatelliteFragmentationsEvents } from './SatelliteFragmentationsEvents';
import { SatelliteInformation } from './SatelliteInformation';
import { SatellitePositionHistory } from './SatellitePositionHistory';
import { SatelliteReentriesEvents } from './SatelliteReentriesEvents';

type SatelliteAccordionProps = {
  noradId: string;
  object: TypeSatelliteOut;
  epoch?: TypeEpoch;
  report?: TypeReportFlagSettings;
};

const SatelliteAccordion = async ({
  noradId,
  object,
  epoch,
  report,
}: SatelliteAccordionProps) => {
  const t = await getTranslations('Satellite.accordion');
  const session = await getSession();

  const ephemerises = await getEphemerises({
    norad_id: noradId,
    sort_by: 'updated_at',
  });

  return (
    <>
      <h2 data-anchor="information" className="govuk-heading-l">{t('satellite_information')}</h2>
      <Accordion
        id="satellite-event"
        addAnchor={false}
        initialItems={[
          {
            id: 'object_data',
            heading: t('object_data'),
            content: (
              <>
                <SatelliteInformation object={object} dataPdf={t('object_data')} haveAnchor={false} showTitle={false} />
                <SatelliteAdditionalInformations object={object} />
              </>
            ),
          },
          {
            id: 'ephemeris_data',
            heading: t('ephemeris_data'),
            content: (
              <SatelliteEphemerisData
                noradId={noradId}
                ephemerises={ephemerises}
                showButtons={isAgencyApprover(session?.user.role) || isSatteliteOperator(session?.user.role)}
              />
            ),
          },
        ]}
      />
      <h2 data-anchor="conjunction_events" className="govuk-heading-l">{t('conjunction_events')}</h2>
      <Accordion
        id="conjunction-events"
        addAnchor={false}
        initialItems={[
          {
            id: 'all_conjunction_events',
            heading: t('all_conjunction_events'),
            content: <SatelliteConjunctionEvents commonName={object.common_name} noradId={noradId} epoch={epoch} report={report} />,
          },
        ]}
      />
      {isAgencyUser(session?.user.role) || isRegulatorUser(session?.user.role)
        ? (
            <>
              <h2 data-anchor="potential-impact" className="govuk-heading-l">{t('activity_information')}</h2>
              <Accordion
                id="activity-events"
                addAnchor={false}
                initialItems={[
                  {
                    id: 'all_activity_events',
                    heading: t('all_activity_events'),
                    content: <SatelliteActivityEvents commonName={object.common_name} noradId={noradId} />,
                  },
                  {
                    id: 'position_history',
                    heading: t('position_history'),
                    content: <SatellitePositionHistory noradId={noradId} commonName={object.common_name} />,
                  },
                ]}
              />
            </>
          )
        : null}
      <h2 data-anchor="reentries" className="govuk-heading-l">{t('reentries')}</h2>
      <Accordion
        id="reentries"
        addAnchor={false}
        initialItems={[
          {
            id: 'all_reentries',
            heading: t('all_reentries'),
            content: <SatelliteReentriesEvents noradId={noradId} />,
          },
        ]}
      />
      <h2 data-anchor="fragmentations" className="govuk-heading-l">{t('fragmentations')}</h2>
      <Accordion
        id="fragmentations"
        addAnchor={false}
        initialItems={[
          {
            id: 'all_fragmentations',
            heading: t('all_fragmentations'),
            content: <SatelliteFragmentationsEvents noradId={noradId} />,
          },
        ]}
      />
    </>

  );
};

export { SatelliteAccordion };
