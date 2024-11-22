'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { DownloadData } from '@/components/DownloadData';
import Accordion from '@/ui/accordion/accordion';
import Details from '@/ui/details/details';

import { ConjunctionEventHistoryTable } from './event-history-table/ConjunctionEventHistoryTable';
import { ConjunctionObjectDataAdditionalTable } from './object-data-table/ConjunctionObjectDataAdditionalTable';
import { ConjunctionObjectDataGeneralTable } from './object-data-table/ConjunctionObjectDataGeneralTable';
import { ConjunctionObjectDataLicenseTable } from './object-data-table/ConjunctionObjectDataLicenseTable';
import { ConjunctionObjectDataOrbitalTable } from './object-data-table/ConjunctionObjectDataOrbitalTable';

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
  const t = useTranslations('Accordions.Conjunction');

  const dataArray = [primaryObject, secondaryObject].filter(item => !!item);

  return (
    <Accordion
      id="event-details"
      initialItems={[
        {
          id: 'pocChart',
          heading: t('poc_chart.title'),
          content: (
            <div>
              <Details summary={t('poc_chart.help.title')}>
                <p className="govuk-body">{t('poc_chart.help.description1')}</p>
                <p className="govuk-body">
                  {t('poc_chart.help.description2_1')}
                  <strong className="govuk-tag">{t('poc_chart.help.description2_2')}</strong>
                  {t('poc_chart.help.description2_3')}
                </p>
                <p className="govuk-body">{t('poc_chart.help.description3')}</p>
                <p className="govuk-body">
                  {t('poc_chart.help.description4_1')}
                  <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">
                    {t('poc_chart.help.description4_2')}
                  </Link>
                </p>
              </Details>
            </div>
          ),
        },
        ...(haveMtp
          ? [{
              id: 'mtpChart',
              heading: t('mtp_chart.title'),
              content: (
                <div></div>
              ),
            }]
          : []),
        {
          id: 'missDistanceChart',
          heading: t('miss_distance_chart.title'),
          content: (
            <div>
              <Details summary={t('miss_distance_chart.help.title')}>
                <p className="govuk-body">{t('miss_distance_chart.help.description1')}</p>
                <p className="govuk-body">
                  {t('miss_distance_chart.help.description2_1')}
                  <strong className="govuk-tag">{t('miss_distance_chart.help.description2_2')}</strong>
                  {t('miss_distance_chart.help.description2_3')}
                </p>
                <p className="govuk-body">{t('miss_distance_chart.help.description3')}</p>
                <p className="govuk-body">
                  {t('miss_distance_chart.help.description4_1')}
                  <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">
                    {t('miss_distance_chart.help.description4_2')}
                  </Link>
                </p>
              </Details>
            </div>
          ),
        },
        {
          id: 'objectData',
          heading: t('object_data.title'),
          content: (
            <>
              <div className="govuk-body mt-2">
                {t('object_data.space_track')}
              </div>
              <div className="overflow-auto">
                <ConjunctionObjectDataGeneralTable data={dataArray} />
              </div>
              <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
                {t('object_data.license_summary.title')}
              </h3>
              <div className="overflow-auto">
                <ConjunctionObjectDataLicenseTable data={dataArray} />
              </div>
              <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
                {t('object_data.orbital_summary.title')}
              </h3>
              <div className="overflow-auto">
                <ConjunctionObjectDataOrbitalTable data={dataArray} />
              </div>
              <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
                {t('object_data.additional_object_summary.title')}
              </h3>
              <div className="govuk-body mt-5">
                {t('object_data.additional_object_summary.description1')}
              </div>
              <div className="govuk-body mt-2">
                {t('object_data.additional_object_summary.description2')}
              </div>
              <div className="overflow-auto">
                <ConjunctionObjectDataAdditionalTable data={dataArray} />
              </div>
            </>
          ),
        },
        {
          id: 'eventHistory',
          heading: t('event_history.title'),
          content: (
            <>
              <ConjunctionEventHistoryTable events={events} event={event} dataSources={dataSources} />
              <DownloadData type={t('download')} params={{}} downloadAction={handleDownloadData} />
              <Details summary={t('event_history.help.title')}>
                <p className="govuk-body">{t('event_history.help.description1')}</p>
                <p className="govuk-body">
                  {t('event_history.help.description2')}
                  <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">
                    {t('event_history.help.link')}
                  </Link>
                </p>
              </Details>
            </>
          ),
        },
        {
          id: 'furtherInformation',
          heading: t('further_information.title'),
          content: (
            <>
              <p className="govuk-body mt-2">{t('further_information.description')}</p>
              <ul className="govuk-list">
                <li>
                  <Link
                    href="/page/conjunction-analysis-information"
                    passHref
                    className="govuk-link"
                  >
                    {t('further_information.link1')}
                  </Link>
                </li>
                <li>
                  <Link href="/page/definitions" passHref className="govuk-link">
                    {t('further_information.link2')}
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
