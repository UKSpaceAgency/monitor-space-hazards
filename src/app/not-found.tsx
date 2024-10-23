import Link from 'next/link';

import { BaseTemplate } from '@/templates/BaseTemplate';

export default function NotFound() {
  return (
    <html lang="en" className="govuk-template font-sans">
      <body className="govuk-template__body" suppressHydrationWarning>
        <BaseTemplate>
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </BaseTemplate>
      </body>
    </html>
  );
}
