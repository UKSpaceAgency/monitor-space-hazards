'use client';

import type { MouseEvent } from 'react';
import { Fragment, useEffect, useState } from 'react';

type ContentNavigationProps = {
  title?: string;
  className?: string;
  internalTitle?: Array<{ text: string; index: number }>;
};

/**
 * Get all focusable elements (buttons, links, inputs, etc.)
 */
const getFocusableElements = (): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(document.querySelectorAll<HTMLElement>(focusableSelectors));
};

/**
 * Find the next focusable element after a given element
 */
const findNextFocusableElement = (anchorElement: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements();

  // Get all elements in the document
  const allElements = Array.from(document.querySelectorAll<HTMLElement>('*'));

  // Find the index of the anchor element
  const anchorIndex = allElements.findIndex(el => el === anchorElement);

  if (anchorIndex === -1) {
    return null;
  }

  // Look for the first focusable element after the anchor element
  for (let i = anchorIndex + 1; i < allElements.length; i++) {
    const element = allElements[i];
    if (element && focusableElements.includes(element)) {
      return element;
    }
  }

  return null;
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
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });

      // Wait for scroll animation to complete, then focus the next focusable element
      const targetScrollTop = element.offsetTop;

      const handleFocus = () => {
        // First, try to find a parent button
        const parentButton = element.closest('button');
        if (parentButton) {
          parentButton.focus();
          return;
        }

        // Otherwise, find the next focusable element after the anchor
        const nextFocusableElement = findNextFocusableElement(element);
        if (nextFocusableElement) {
          nextFocusableElement.focus();
        }
      };

      // Wait for smooth scroll to complete before focusing
      let lastScrollTop = window.scrollY;
      let scrollCheckCount = 0;

      const checkScrollComplete = () => {
        scrollCheckCount++;

        // If scroll position hasn't changed or we've checked too many times
        if (Math.abs(window.scrollY - targetScrollTop) < 5 || window.scrollY === lastScrollTop || scrollCheckCount > 100) {
          handleFocus();
          return;
        }

        lastScrollTop = window.scrollY;
        requestAnimationFrame(checkScrollComplete);
      };

      // Start checking after a small delay to account for smooth scroll animation
      setTimeout(() => {
        requestAnimationFrame(checkScrollComplete);
      }, 50);
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
