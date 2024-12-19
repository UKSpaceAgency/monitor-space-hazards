import type { Metadata } from 'next';

import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';

export const metadata: Metadata = {
  title: 'Contact information',
};

export default async function ContactPage() {
  const { title, content } = await getPage('contact');

  return (
    <div>
      <h1 className="govuk-heading-xl">{title}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <HtmlMapper content={content} />
        </div>
      </div>
    </div>
  );
}
