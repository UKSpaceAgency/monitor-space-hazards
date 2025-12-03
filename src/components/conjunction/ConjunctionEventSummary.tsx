import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';
import Details from '@/ui/details/details';

import { ConjunctionEventSummaryTableInformationsTable } from './tables/ConjunctionEventSummaryTable';

type ConjunctionEventSummaryProps = {
  shortId: string;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  isSpecial: boolean;
  spacetrack: TypeEventSummaryOut;
  uksa?: TypeEventSummaryOut;
};

const ConjunctionEventSummary = async ({
  shortId,
  spacetrack,
  uksa,
  primaryObject,
  secondaryObject,
  isSpecial,
}: ConjunctionEventSummaryProps) => {
  const t = await getTranslations('Tables.Conjunction');

  // const user = await getUsersMe();
  // const isUserAnalysist = isAgencyApprover(user.role);

  return (
    <>
      <div id="eventSummary" data-pdf={t('conjunction_event_summary')}>
        <h2 className="govuk-heading-l" data-anchor="eventSummary">{t('conjunction_event_summary')}</h2>
        {isSpecial && (
          <div className="govuk-inset-text">
            {t.rich('special_content', {
              link: chunks => <Link href="/page/definitions#data_sources" className="govuk-link">{chunks}</Link>,
            })}
          </div>
        )}
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
        <ConjunctionEventSummaryTableInformationsTable data={uksa ? [spacetrack, uksa] : spacetrack} />
        <Details summary={t.rich('information_on_calculations.title')} data-pdf-ignore>
          {t.rich('information_on_calculations.content')}
        </Details>
      </div>
      <div className="govuk-button-group">
        {/* {isUserAnalysist && (
          <Link
            href={`/conjunctions/${shortId}/analysis-upload`}
          >
            <Button>{t('upload_analysis')}</Button>
          </Link>
        )} */}
        <Button
          as="link"
          href={{
            pathname: '/contact-analyst',
            query: {
              id: shortId,
              callback: `/conjunctions/${shortId}`,
            },
          }}
          aria-label={t('contact_analyst')}
        >
          {t('contact_analyst')}
        </Button>
      </div>
    </>
  );
};

export { ConjunctionEventSummary };
