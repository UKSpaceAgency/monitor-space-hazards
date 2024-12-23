import type { Metadata } from 'next';

import { CookiesChange } from '@/components/cookies/CookiesChange';
import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';

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
          <CookiesChange />
        </div>
      </div>
    </div>
  );
}
