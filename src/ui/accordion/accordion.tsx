'use client';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Suspense, useEffect, useState } from 'react';

import Spinner from '../spinner/spinner';

type AccordionProps = {
  id: string;
  dynamic?: boolean;
  initialItems: {
    id: string;
    heading: string;
    content: ReactNode;
    summary?: ReactNode;
    expanded?: boolean;
  }[];
};

export function Accordion({ initialItems, id, dynamic = false }: AccordionProps) {
  const [isAllItemsExpanded, setAllItemsExpanded] = useState(false);
  const [items, setItems] = useState(initialItems);

  const toggleAllItems = () => {
    setAllItemsExpanded(prevState => !prevState);
  };

  const toggleItem = (id: string) => {
    const modifiedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          expanded: !item.expanded,
        };
      }

      return item;
    });

    setItems(modifiedItems);
  };

  useEffect(() => {
    setItems(prevItems => prevItems.map(item => ({
      ...item,
      expanded: isAllItemsExpanded,
    })));
  }, [isAllItemsExpanded]);

  return (
    <div id={`accordion-${id}`} className="govuk-frontend-supported">
      <div className="govuk-accordion">
        <div className="govuk-accordion__controls">
          <button
            type="button"
            className="govuk-accordion__show-all"
            onClick={toggleAllItems}
            aria-expanded={isAllItemsExpanded}
          >
            <span className={clsx('govuk-accordion-nav__chevron', {
              'govuk-accordion-nav__chevron--down': !isAllItemsExpanded,
            })}
            >
            </span>
            <span className="govuk-accordion__show-all-text">
              {
                isAllItemsExpanded ? 'Hide all sections' : 'Show all sections'
              }
            </span>
          </button>
        </div>
        {items.map(({ heading, summary, content, expanded, id }) => (
          <div
            key={`accordion-${id}`}
            id={id}
          >
            <div
              className="govuk-accordion__section-header"
            >
              <button
                type="button"
                aria-controls={`content-${id}`}
                aria-expanded={items.find(item => item.id === id)?.expanded}
                aria-label={heading}
                className="govuk-accordion__section-button w-full text-start"
                onClick={() => toggleItem(id)}
              >
                <span
                  className="govuk-accordion__section-heading-text"
                  id={`heading-${id}`}
                >
                  <h2
                    className="govuk-accordion__section-heading-text-focus"
                    data-anchor={id}
                  >
                    {heading}
                  </h2>
                </span>
                <span className="govuk-accordion__section-toggle">
                  <span className="govuk-accordion__section-toggle-focus">
                    <span className={clsx('govuk-accordion-nav__chevron', {
                      'govuk-accordion-nav__chevron--down': !expanded,
                    })}
                    >
                    </span>
                    <span className="govuk-accordion__section-toggle-text">{expanded ? 'Hide' : 'Show'}</span>
                  </span>
                </span>
              </button>

              {summary && expanded && (
                <div
                  className={clsx(
                    'govuk-accordion__section-summary',
                    'govuk-body',
                  )}
                  id={`summary-${id}`}
                >
                  {summary}
                </div>
              )}
            </div>
            <div
              id={`content-${id}`}
              className={clsx({
                'content-visibility-hidden': !expanded,
              })}
            >
              {dynamic ? expanded ? <Suspense fallback={<Spinner />}>{content}</Suspense> : null : content}
            </div>
          </div>
        ),
        )}
      </div>
    </div>
  );
}

export default Accordion;
