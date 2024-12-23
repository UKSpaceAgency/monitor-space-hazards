import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { getUsersMe } from '@/actions/getUsersMe';
import Button from '@/ui/button/button';
import Details from '@/ui/details/details';
import { isAnalysist } from '@/utils/Roles';

import { ConjunctionEventSummaryTableInformationsTable } from './tables/ConjunctionEventSummaryTable';

type ConjunctionEventSummaryProps = {
  shortId: string;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  event: TypeEventSummaryOut;
  isSpecial: boolean;
};

const ConjunctionEventSummary = async ({
  shortId,
  event,
  primaryObject,
  secondaryObject,
  isSpecial,
}: ConjunctionEventSummaryProps) => {
  const t = await getTranslations('Tables.Conjunction');

  const user = await getUsersMe();
  const isUserAnalysist = isAnalysist(user.role);

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
        <ConjunctionEventSummaryTableInformationsTable object={event} />
        <Details summary={t('information_on_calculations.title')} data-pdf-ignore>
          {t.rich('information_on_calculations.content')}
        </Details>
      </div>
      <div className="govuk-button-group">
        {isUserAnalysist && (
          <Link
            href={`/conjunctions/${shortId}/analysis-upload`}
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
