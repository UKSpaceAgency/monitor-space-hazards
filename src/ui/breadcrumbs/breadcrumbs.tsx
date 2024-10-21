import Link from 'next/link';
import type { ReactNode } from 'react';

type BreakcrumbsProps = {
  items: Array<{
    text: ReactNode;
    href?: string;
  }>;
};

export function Breakcrumbs({ items }: BreakcrumbsProps) {
  return (
    <nav className="govuk-breadcrumbs" aria-label="Breadcrumb">
      <ol className="govuk-breadcrumbs__list">
        {items.map(({ text, href }, index) => (
          <li
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

export default Breakcrumbs;
