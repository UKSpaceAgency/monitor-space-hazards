import type { Metadata } from 'next';

import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';

export const metadata: Metadata = {
  title: 'View Terms and Conditions',
};

export default async function TermsAndConditions() {
  const { title, content } = await getPage('terms-and-conditions');

  return (
    <>
      <h1 className="govuk-heading-xl">{title}</h1>
      <HtmlMapper content={content} />
    </>
  );
}
