import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CookiesChange } from '@/components/cookies/CookiesChange';
import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'Cookies information',
};

export default async function Cookies() {
  const { title, content } = await getPage('cookies');

  return (
    <div>
      <h1 className="govuk-heading-xl">{title}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <HtmlMapper content={content} />
          <Suspense fallback={<Spinner />}>
            <CookiesChange />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
