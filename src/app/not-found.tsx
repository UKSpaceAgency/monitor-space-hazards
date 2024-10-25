import Link from 'next/link';

import { ErrorTemplate } from '@/templates/ErrorTemplate';

export default function NotFound() {
  return (
    <ErrorTemplate>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-8">Page not found</h1>
      <p className="govuk-body">If you entered a web address, check it is correct.</p>
      <Link className="govuk-link" href="/">Return Home</Link>
    </ErrorTemplate>
  );
}
