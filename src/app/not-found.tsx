import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Page not found</h1>
      <p className="govuk-body">If you entered a web address, check it is correct.</p>
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
