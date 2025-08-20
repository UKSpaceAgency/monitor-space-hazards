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
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav aria-label="Content navigation" className={className}>
      <ul>
        <li><h3 className="govuk-caption-m">{title || 'Contents'}</h3></li>
        {anchors.map((anchor, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {internalTitle?.find(item => item.index === index) && (
                <li><h3 className="govuk-caption-m mt-[30px]">{internalTitle?.find(item => item.index === index)?.text}</h3></li>
              )}
              <li className="relative pt-2 before:content-['—'] before:w-5 before:mr-1">
                <a className="govuk-link govuk-link--no-underline" href={`#${anchor.anchor}`} onClick={handleClick}>
                  {anchor.text}
                </a>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export { ContentNavigation };
