import Link from 'next/link';
import type { ReactNode } from 'react';

type BreadcrumbsProps = {
  items: Array<{
    text: ReactNode;
    href?: string;
  }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="govuk-breadcrumbs" aria-label="Breadcrumb">
      <ol className="govuk-breadcrumbs__list">
        {items.map(({ text, href }, index) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="govuk-breadcrumbs__list-item"
          >
            {href
              ? (
                  <Link href={href} className="govuk-breadcrumbs__link">
                    {text}
                  </Link>
                )
              : (
                  text
                )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
