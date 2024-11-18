import dayjs from 'dayjs';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import Details from '@/ui/details/details';
import SummaryList from '@/ui/summary-list/summary-list';

type ConjunctionSummaryProps = {
  isUserAnalysist: boolean;
  shortId: string;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  event: TypeEventSummaryOut;
};

const ConjunctionSummary = async ({
  isUserAnalysist,
  shortId,
  event,
  primaryObject,
  secondaryObject,
}: ConjunctionSummaryProps) => {
  const t = await getTranslations('Tables');

  return (
    <>
      <div id="eventSummary">
        <h2 className="govuk-heading-l">{t('Conjunction.conjunction_event_summary')}</h2>
        <ul className="govuk-list">
          <li>
            {t('Conjunction.primary_object')}
            <Link
              href={`/satellites/${primaryObject.noradId}`}
              className="govuk-link"
            >
              {primaryObject.commonName ?? t('Conjunction.unknown')}
            </Link>
          </li>
          <li>
            {t('Conjunction.secondary_object')}
            {!secondaryObject
              ? (t('Conjunction.unknown'))
              : (
                  <Link
                    href={`/satellites/${secondaryObject.noradId}`}
                    className="govuk-link"
                  >
                    {secondaryObject.commonName}
                  </Link>
                )}
          </li>
        </ul>
        <SummaryList
          className="block"
          rows={[
            {
              key: {
                children: '',
              },
              value: {
                children: <b>{t('Conjunction.summary_list.space_track_cdm')}</b>,
                className: 'w-2/5',
              },
            },
            {
              key: {
                children: <div>{t('Conjunction.summary_list.cdm_id')}</div>,
              },
              value: {
                children: event.cdmExternalId,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.probability_of_collision'),
              },
              value: {
                children: event.collisionProbability,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.probability_of_collision_calc_method'),
              },
              value: {
                children: event.collisionProbabilityMethod,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.time_of_closest_approach'),
              },
              value: {
                children: dayjs(event.tcaTime).format(FORMAT_DATE_TIME),
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.total_miss_distance'),
              },
              value: {
                children: event.missDistance,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.radial_miss_distance'),
              },
              value: {
                children: event.radialMissDistance,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.in_track_miss_distance'),
              },
              value: {
                children: event.intrackMissDistance,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.cross_track_miss_distance'),
              },
              value: {
                children: event.crosstrackMissDistance,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.time_of_update'),
              },
              value: {
                children: dayjs(event.updateTime).format(FORMAT_DATE_TIME),
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.primary_object_size'),
              },
              value: {
                children: event.primaryObjectSize,
              },
            },
            {
              key: {
                children: t('Conjunction.summary_list.secondary_object_size'),
              },
              value: {
                children: event.secondaryObjectSize,
              },
            },
          ]}
        />
        <Details summary={t('Conjunction.information_on_calculations.title')}>
          <p>{t('Conjunction.information_on_calculations.description1')}</p>
          <p>{t('Conjunction.information_on_calculations.description2')}</p>
        </Details>
      </div>
      <div className="govuk-button-group">
        {isUserAnalysist && (
          <Link
            href={`/conjunctions/${shortId}/analysis-upload`}
            passHref
            legacyBehavior
          >
            <Button>{t('Conjunction.upload_analysis')}</Button>
          </Link>
        )}
        <Link
          href={{
            pathname: '/contact-analyst',
            query: {
              id: shortId,
            },
          }}
          passHref
          legacyBehavior
        >
          <Button className="govuk-button--secondary">
            {t('Conjunction.contact_analyst')}
          </Button>
        </Link>
      </div>
    </>
  );
};

export { ConjunctionSummary };
