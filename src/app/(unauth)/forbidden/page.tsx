import Link from 'next/link';

export default function Forbidden() {
  return (
    <div>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">403 - Forbidden</h1>
      <p className="govuk-body">You don’t have permission to access this page.</p>
      <p className="govuk-body">
        You can
        {' '}
        <Link className="govuk-link" href="/">browse from the homepage</Link>
        {' '}
        or use the menu above to find the information you need.
      </p>

    </div>
  );
}
