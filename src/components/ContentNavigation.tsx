'use client';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

const ContentNavigation = ({ title, className }: { title?: string; className?: string }) => {
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
      <ol className="list-none">
        {anchors.map((anchor, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="relative pt-2 px-6">
              <span className="absolute left-0 w-5">—</span>
              <a className="govuk-link govuk-link--no-underline" href={`#${anchor.anchor}`} onClick={handleClick}>
                {anchor.text}
              </a>
            </li>
          );
        })}

      </ol>
    </nav>
  );
};

export { ContentNavigation };
