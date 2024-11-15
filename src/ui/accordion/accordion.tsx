import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

type AccordionProps = {
  id: string;
  initialItems: {
    id: string;
    heading: string;
    summary?: ReactNode;
    content: ReactNode;
    expanded?: boolean;
  }[];
};

export function Accordion({ initialItems }: AccordionProps) {
  const [selected, setSelected] = useState(new Set());
  const [isAllItemsExpanded, setAllItemsExpanded] = useState(false);
  const [items, setItems] = useState(initialItems);

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
    <div id="accordion-default" className="govuk-accordion govuk-frontend-supported">
      <div className="govuk-accordion__controls">
        <button
          type="button"
          className="govuk-accordion__show-all"
          onClick={toggleAllItems}
          aria-expanded={isAllItemsExpanded}
        >
          <span className={clsx({
            'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down': !isAllItemsExpanded,
            'govuk-accordion-nav__chevron': isAllItemsExpanded,
          })}
          >
          </span>
          <span className="govuk-accordion__show-all-text">{isAllItemsExpanded ? 'Hide all sections' : 'Show all sections'}</span>
        </button>
      </div>
      {items.map(({ heading, summary, content, expanded, id }, index) => (
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
                aria-expanded={selected.has(index)}
                aria-label={heading}
                className="w-full"
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

            <button
              type="button"
              className="govuk-accordion__section-toggle"
              onClick={() => toggleItem(id)}
              aria-expanded={isAllItemsExpanded}
            >
              <span className="govuk-accordion__section-toggle-focus">
                <span className={clsx({
                  'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down': !expanded,
                  'govuk-accordion-nav__chevron': expanded,
                })}
                >
                </span>
                <span className="govuk-accordion__section-toggle-text">{expanded ? 'Hide' : 'Show'}</span>
              </span>
            </button>

            {summary && expanded && (
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
          {expanded && (
            <div
              id={`${id}-content-${index}`}
            >
              {content}
            </div>
          )}
        </div>
      ),
      )}
    </div>
  );
}

export default Accordion;
