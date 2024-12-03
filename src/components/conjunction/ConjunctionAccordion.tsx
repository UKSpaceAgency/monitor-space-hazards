'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { DownloadData } from '@/components/DownloadData';
import { AdditionalInformationsTable } from '@/components/satellite/tables/AdditionalInformationsTable';
import { BaseInformationsTable } from '@/components/satellite/tables/BaseInformationsTable';
import { LicenseInformationsTable } from '@/components/satellite/tables/LicenseInformationsTable';
import { OrbitalInformationsTable } from '@/components/satellite/tables/OrbitalInformationsTable';
import Accordion from '@/ui/accordion/accordion';
import Details from '@/ui/details/details';

import { ConjunctionEventHistoryTable } from '../data-tables/ConjunctionEventHistoryTable';

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

  const dataArray = [primaryObject, secondaryObject || {} as TypeSatelliteOut];

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
                {t.rich('poc_chart.help.content', {
                  p: chunks => <p>{chunks}</p>,
                  special: chunks => <strong className="govuk-tag">{chunks}</strong>,
                  link: chunks => <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">{chunks}</Link>,
                })}
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
                {t.rich('miss_distance_chart.help.content', {
                  p: chunks => <p>{chunks}</p>,
                  special: chunks => <strong className="govuk-tag">{chunks}</strong>,
                  link: chunks => <Link href={`/conjunctions/${id}#eventHistory`} className="govuk-link">{chunks}</Link>,
                })}
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
                <BaseInformationsTable object={dataArray} headerCellWidth="xs" showLink />
              </div>
              <div className="overflow-auto">
                <LicenseInformationsTable object={dataArray} headerCellWidth="xs" />
              </div>
              <div className="overflow-auto">
                <OrbitalInformationsTable object={dataArray} headerCellWidth="xs" />
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
                <AdditionalInformationsTable object={dataArray} headerCellWidth="xs" />
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
                {t.rich('event_history.help.content', {
                  p: chunks => <p>{chunks}</p>,
                  link: chunks => <Link href="/page/definitions#data_sources" className="govuk-link">{chunks}</Link>,
                })}
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
