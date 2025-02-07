'use client';
import clsx from 'clsx';
import type { SyntheticEvent } from 'react';

import styles from './side-navigation-list.module.scss';

type SideNavigationListProps = {
  title: string;
  items: Array<{
    name: string;
    to: string;
  }>;
};

export function SideNavigationList({ title, items }: SideNavigationListProps) {
  const handleClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.currentTarget.hash) {
      const anchor = document.querySelector(e.currentTarget.hash);
      if (anchor) {
        window.scrollTo({
          top: (anchor as HTMLElement).offsetTop,
        });
      }
    }
  };

  return (
    <nav
      className="govuk-!-margin-bottom-6"
      data-cy="side-navigation"
      aria-label="Content navigation"
    >
      <h3 className={clsx('govuk-caption-m', styles.header)}>{title}</h3>
      <ol className={styles.list}>
        {items.map(item => (
          <li className={styles.listItem} key={item.name}>
            <a className="govuk-link govuk-link--no-underline" href={item.to} onClick={handleClick}>
              {item.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default SideNavigationList;
