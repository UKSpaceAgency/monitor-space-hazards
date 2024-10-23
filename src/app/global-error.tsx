'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

import { BaseTemplate } from '@/templates/BaseTemplate';

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
        <BaseTemplate>
          <NextError statusCode={0} />
        </BaseTemplate>
      </body>
    </html>
  );
}
