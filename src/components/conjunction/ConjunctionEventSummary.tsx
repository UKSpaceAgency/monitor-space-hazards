import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';
import Details from '@/ui/details/details';

import { ConjunctionEventSummaryTableInformationsTable } from './tables/ConjunctionEventSummaryTable';

type ConjunctionEventSummaryProps = {
  isUserAnalysist: boolean;
  shortId: string;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  event: TypeEventSummaryOut;
};

const ConjunctionEventSummary = async ({
  isUserAnalysist,
  shortId,
  event,
  primaryObject,
  secondaryObject,
}: ConjunctionEventSummaryProps) => {
  const t = await getTranslations('Tables.Conjunction');

  return (
    <>
      <div id="eventSummary" data-pdf={t('conjunction_event_summary')}>
        <h2 className="govuk-heading-l" data-anchor="eventSummary">{t('conjunction_event_summary')}</h2>
        <ul className="govuk-list" data-pdf-ignore>
          <li>
            {t('primary_object')}
            <Link
              href={`/satellites/${primaryObject.noradId}`}
              className="govuk-link"
            >
              {primaryObject.commonName ?? t('unknown')}
            </Link>
          </li>
          <li>
            {t('secondary_object')}
            {!secondaryObject
              ? (t('unknown'))
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
        <ConjunctionEventSummaryTableInformationsTable object={event} />
        <Details summary={t('information_on_calculations.title')} data-pdf-ignore>
          {t.rich('information_on_calculations.content')}
        </Details>
      </div>
      <div className="govuk-button-group">
        {isUserAnalysist && (
          <Link
            href={`/conjunctions/${shortId}/analysis-upload`}
            passHref
            legacyBehavior
          >
            <Button>{t('upload_analysis')}</Button>
          </Link>
        )}
        <Link
          href={{
            pathname: '/contact-analyst',
            query: {
              id: shortId,
              callback: `/conjunctions/${shortId}`,
            },
          }}
          passHref
          legacyBehavior
        >
          <Button className="govuk-button--secondary">
            {t('contact_analyst')}
          </Button>
        </Link>
      </div>
    </>
  );
};

export { ConjunctionEventSummary };
