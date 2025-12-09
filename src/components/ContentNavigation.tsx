'use client';

import type { MouseEvent } from 'react';
import { Fragment, useEffect, useState } from 'react';

type ContentNavigationProps = {
  title?: string;
  className?: string;
  internalTitle?: Array<{ text: string; index: number }>;
};

const ContentNavigation = ({ title, internalTitle, className }: ContentNavigationProps) => {
  const [anchors, setAnchors] = useState<Array<{ text: string; anchor: string }>>([]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-anchor]');
    const anchorsList = Array.from(elements).map(element => ({
      text: element.textContent as string,
      anchor: element.dataset.anchor as string,
    }));
    setAnchors(anchorsList);
  }, [setAnchors]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.hash.replace('#', '');
    const element = document.querySelector<HTMLElement>(`[data-anchor="${target}"]`);

    if (element) {
      e.currentTarget.blur();
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  // Group anchors by their section
  const groupedAnchors: Array<{ sectionHeading?: string; anchors: Array<{ text: string; anchor: string }> }> = [];
  let currentSection: { sectionHeading?: string; anchors: Array<{ text: string; anchor: string }> } = { anchors: [] };

  anchors.forEach((anchor, index) => {
    const sectionTitle = internalTitle?.find(item => item.index === index);

    if (sectionTitle) {
      // If we have a section title, save the current section and start a new one
      if (currentSection.anchors.length > 0 || currentSection.sectionHeading) {
        groupedAnchors.push(currentSection);
      }
      currentSection = { sectionHeading: sectionTitle.text, anchors: [anchor] };
    } else {
      currentSection.anchors.push(anchor);
    }
  });

  // Add the last section
  if (currentSection.anchors.length > 0 || currentSection.sectionHeading) {
    groupedAnchors.push(currentSection);
  }

  // If no sections exist, create one default section
  if (groupedAnchors.length === 0 && anchors.length > 0) {
    groupedAnchors.push({ anchors });
  }

  return (
    <nav aria-label="Content navigation" className={className}>
      <h2 className="govuk-caption-m">{title || 'Contents'}</h2>
      {groupedAnchors.map((group, groupIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={groupIndex}>
          {group.sectionHeading && (
            <h2 className="govuk-caption-m mt-[30px]">{group.sectionHeading}</h2>
          )}
          {group.anchors.length > 0 && (
            <ul>
              {group.anchors.map((anchor, anchorIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={anchorIndex} className="relative pt-2 before:content-['—'] before:w-5 before:mr-1">
                  <a className="govuk-link govuk-link--no-underline" href={`#${anchor.anchor}`} onClick={handleClick}>
                    {anchor.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export { ContentNavigation };
