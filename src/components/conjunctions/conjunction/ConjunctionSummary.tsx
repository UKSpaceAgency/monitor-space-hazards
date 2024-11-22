import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';
import Details from '@/ui/details/details';

import { ConjunctionSummaryInformationsTable } from './ConjunctionSummaryTable';

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
        <ConjunctionSummaryInformationsTable object={event} />
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
