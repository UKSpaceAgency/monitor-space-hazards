import type { Metadata } from 'next';

import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';

export const metadata: Metadata = {
  title: 'Accessibility statement for NSpOC\'s Monitor Space Hazards service',
};

export default async function AccessibilityStatement() {
  const { title, content } = await getPage('accessibility-statement');

  return (
    <>
      <h1 className="govuk-heading-xl">{title}</h1>
      <HtmlMapper content={content} />
    </>
  );
}
