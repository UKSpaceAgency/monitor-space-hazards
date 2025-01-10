'use client';

import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

import { ErrorTemplate } from '@/templates/ErrorTemplate';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className="govuk-template font-sans">
      <body className="govuk-template__body" suppressHydrationWarning>
        <ErrorTemplate>
          <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Something went wrong</h1>
          <p className="govuk-body">If you entered a web address, check it is correct.</p>
          <p className="govuk-body">
            You can
            {' '}
            <Link className="govuk-link" href="/">browse from the homepage</Link>
            {' '}
            or use the menu above to find the information you need.
          </p>
          <p className="govuk-body">
            If the problem persists, please contact
            {' '}
            <a className="govuk-link" href="mailto:monitorspacehazards@ukspaceagency.gov.uk">monitorspacehazards@ukspaceagency.gov.uk</a>
            .
          </p>
        </ErrorTemplate>
      </body>
    </html>
  );
}
