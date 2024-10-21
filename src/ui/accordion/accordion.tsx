import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';

type AccordionProps = {
  id: string;
  items: {
    heading: string;
    summary?: ReactNode;
    content: ReactNode;
    expanded?: boolean;
  }[];
};

export function Accordion({ id, items }: AccordionProps) {
  const [selected, setSelected] = useState(new Set());

  const handleHeaderClick = (i: number) => {
    setSelected((selected) => {
      const active = new Set(selected);
      if (active.has(i)) {
        active.delete(i);
      } else {
        active.add(i);
      }
      return new Set(active);
    });
  };

  return (
    <div id={id} className={clsx('govuk-accordion')}>
      {/* <div className={classNames(styles['govuk-accordion__controls'])}>
        <button
          type="button"
          class="govuk-accordion__show-all"
          aria-expanded="false"
        >
          <span class="govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down"></span>
          <span class="govuk-accordion__show-all-text">Show all sections</span>
        </button>
      </div> */}
      {items.map(({ heading, summary, content }, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`accordion-${index}`}
        >
          <div
            className={clsx('govuk-accordion__section-header')}
          >
            <h2
              className={clsx('govuk-accordion__section-heading')}
            >
              <button
                type="button"
                aria-controls={`${id}-content-${index}`}
                className={clsx(
                  'govuk-accordion__section-button',
                )}
                aria-expanded={selected.has(index)}
                aria-label={heading}
                onClick={() => handleHeaderClick(index)}
              >
                <span
                  className={clsx(
                    'govuk-accordion__section-button',
                  )}
                  id={`${id}-heading-${index}`}
                >
                  {heading}
                </span>
              </button>
            </h2>
            {summary && (
              <div
                className={clsx(
                  'govuk-accordion__section-summary',
                  'govuk-body',
                )}
                id={`${id}-summary-${index}`}
              >
                {summary}
              </div>
            )}
          </div>
          <div
            id={`${id}-content-${index}`}
            className={clsx('govuk-accordion__section-content',
            )}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
