'use client';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

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
      <h3 className="govuk-caption-m">{title || 'Contents'}</h3>
      <div>
        {anchors.map((anchor, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              {internalTitle?.find(item => item.index === index) && (
                <h3 className="govuk-caption-m mt-[30px]">{internalTitle?.find(item => item.index === index)?.text}</h3>
              )}
              <div className="relative pt-2 px-6">
                <span className="absolute left-0 w-5">—</span>
                <a className="govuk-link govuk-link--no-underline" href={`#${anchor.anchor}`} onClick={handleClick}>
                  {anchor.text}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export { ContentNavigation };
