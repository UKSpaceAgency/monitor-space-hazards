'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';
import Accordion from '@/ui/accordion/accordion';
import Details from '@/ui/details/details';

import { ConjunctionEventHistoryTable } from './event-history-table/ConjunctionEventHistoryTable';
import type {
  ObjectDataAdditionalType,
  ObjectDataGeneralType,
  ObjectDataLicenseType,
  ObjectDataOrbitalType,
} from './objectDataTables';
import { getObjectDataColumns, getObjectDataTableData } from './objectDataTables';

type ConjunctionAccordionType = {
  id: string;
  haveMtp: boolean;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  dataSources: TypeDataSourcesOut;
  handleDownloadData: () => Promise<unknown>;
};

const ConjunctionAccordion = ({
  id,
  haveMtp,
  primaryObject,
  secondaryObject,
  events,
  event,
  dataSources,
  handleDownloadData,
}: ConjunctionAccordionType) => {
  const t = useTranslations('Accordions');

  const objectDataColumns = getObjectDataColumns({
    primaryObject: t('Conjunction.objectData.primary_object'),
    secondaryObject: t('Conjunction.objectData.secondary_object'),
  });

  const generalData = getObjectDataTableData<ObjectDataGeneralType>({
    primaryObject,
    secondaryObject,
    locales: {
      commonName: t('Conjunction.objectData.general_summary.common_name'),
      noradId: t('Conjunction.objectData.general_summary.norad_id'),
      internationalDesignator: t('Conjunction.objectData.general_summary.international_designator'),
      objectType: t('Conjunction.objectData.general_summary.object_type'),
    },
  });

  const licenseData = getObjectDataTableData<ObjectDataLicenseType>({
    primaryObject,
    secondaryObject,
    locales: {
      licenseCountry: t('Conjunction.objectData.license_summary.country'),
      launchSite: t('Conjunction.objectData.license_summary.launching_site'),
      launchDate: t('Conjunction.objectData.license_summary.launch_date'),
    },
  });

  const orbitalData = getObjectDataTableData<ObjectDataOrbitalType>({
    primaryObject,
    secondaryObject,
    locales: {
      apogee: t('Conjunction.objectData.orbital_summary.apogee'),
      perigee: t('Conjunction.objectData.orbital_summary.perigee'),
      inclination: t('Conjunction.objectData.orbital_summary.inclination'),
      period: t('Conjunction.objectData.orbital_summary.period'),
    },
  });

  const additionalData = getObjectDataTableData<ObjectDataAdditionalType>({
    primaryObject,
    secondaryObject,
    locales: {
      shape: t('Conjunction.objectData.additional_object_summary.shape'),
      mass: t('Conjunction.objectData.additional_object_summary.mass'),
      crossSectionAvg: t('Conjunction.objectData.additional_object_summary.average_cross_section'),
      crossSectionMax: t('Conjunction.objectData.additional_object_summary.max_cross_section'),
      crossSectionMin: t('Conjunction.objectData.additional_object_summary.min_cross_section'),
      height: t('Conjunction.objectData.additional_object_summary.height'),
      width: t('Conjunction.objectData.additional_object_summary.width'),
      depth: t('Conjunction.objectData.additional_object_summary.depth'),
      span: t('Conjunction.objectData.additional_object_summary.span'),
      diameter: t('Conjunction.objectData.additional_object_summary.diameter'),
    },
  });

  return (
    <Accordion
      id="event-details"
      initialItems={[
        {
          id: 'pocChart',
          heading: t('Conjunction.pocChart.title'),
          content: (
            <div>
              <Details summary={t('Conjunction.pocChart.help.title')}>
                <p className="govuk-body">{t('Conjunction.pocChart.help.description1')}</p>
                <p className="govuk-body">
                  {t('Conjunction.pocChart.help.description2_1')}
                  <strong className="govuk-tag">{t('Conjunction.pocChart.help.description2_2')}</strong>
                  {t('Conjunction.pocChart.help.description2_3')}
                </p>
                <p className="govuk-body">{t('Conjunction.pocChart.help.description3')}</p>
                <p className="govuk-body">
                  {t('Conjunction.pocChart.help.description4_1')}
                  <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">
                    {t('Conjunction.pocChart.help.description4_2')}
                  </Link>
                </p>
              </Details>
            </div>
          ),
        },
        ...(haveMtp
          ? [{
              id: 'mtpChart',
              heading: t('Conjunction.mtpChart.title'),
              content: (
                <div></div>
              ),
            }]
          : []),
        {
          id: 'missDistanceChart',
          heading: t('Conjunction.missDistanceChart.title'),
          content: (
            <div>
              <Details summary={t('Conjunction.missDistanceChart.help.title')}>
                <p className="govuk-body">{t('Conjunction.missDistanceChart.help.description1')}</p>
                <p className="govuk-body">
                  {t('Conjunction.missDistanceChart.help.description2_1')}
                  <strong className="govuk-tag">{t('Conjunction.missDistanceChart.help.description2_2')}</strong>
                  {t('Conjunction.missDistanceChart.help.description2_3')}
                </p>
                <p className="govuk-body">{t('Conjunction.pocChart.help.description3')}</p>
                <p className="govuk-body">
                  {t('Conjunction.missDistanceChart.help.description4_1')}
                  <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">
                    {t('Conjunction.missDistanceChart.help.description4_2')}
                  </Link>
                </p>
              </Details>
            </div>
          ),
        },
        {
          id: 'objectData',
          heading: t('Conjunction.objectData.title'),
          content: (
            <>
              <div className="govuk-body mt-2">
                {t('Conjunction.objectData.space_track')}
              </div>
              <div className="overflow-auto">
                <DataTable data={generalData} columns={objectDataColumns} />
              </div>
              <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
                {t('Conjunction.objectData.license_summary.title')}
              </h3>
              <div className="overflow-auto">
                <DataTable data={licenseData} columns={objectDataColumns} />
              </div>
              <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
                {t('Conjunction.objectData.orbital_summary.title')}
              </h3>
              <div className="overflow-auto">
                <DataTable data={orbitalData} columns={objectDataColumns} />
              </div>
              <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
                {t('Conjunction.objectData.additional_object_summary.title')}
              </h3>
              <div className="govuk-body mt-5">
                {t('Conjunction.objectData.additional_object_summary.description1')}
              </div>
              <div className="govuk-body mt-2">
                {t('Conjunction.objectData.additional_object_summary.description2')}
              </div>
              <div className="overflow-auto">
                <DataTable data={additionalData} columns={objectDataColumns} />
              </div>
            </>
          ),
        },
        {
          id: 'eventHistory',
          heading: t('Conjunction.event_history.title'),
          content: (
            <>
              <ConjunctionEventHistoryTable events={events} event={event} dataSources={dataSources} />
              <DownloadData type={t('Conjunction.download')} params={{}} downloadAction={handleDownloadData} />
              <Details summary={t('Conjunction.event_history.help.title')}>
                <p className="govuk-body">{t('Conjunction.event_history.help.description1')}</p>
                <p className="govuk-body">
                  {t('Conjunction.event_history.help.description2')}
                  <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">
                    {t('Conjunction.event_history.help.link')}
                  </Link>
                </p>
              </Details>
            </>
          ),
        },
        {
          id: 'furtherInformation',
          heading: t('Conjunction.further_information.title'),
          content: (
            <>
              <p className="govuk-body mt-2">{t('Conjunction.further_information.description')}</p>
              <ul className="govuk-list">
                <li>
                  <Link
                    href="/page/conjunction-analysis-information"
                    passHref
                    className="govuk-link"
                  >
                    {t('Conjunction.further_information.link1')}
                  </Link>
                </li>
                <li>
                  <Link href="/page/definitions" passHref className="govuk-link">
                    {t('Conjunction.further_information.link2')}
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
    />
  );
};

export { ConjunctionAccordion };
