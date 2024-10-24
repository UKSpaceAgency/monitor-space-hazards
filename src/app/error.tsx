'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import { ErrorTemplate } from '@/templates/ErrorTemplate';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorTemplate>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-8">Something went wrong!</h1>
    </ErrorTemplate>
  );
}
