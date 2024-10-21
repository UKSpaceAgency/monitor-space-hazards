import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { TagProps } from '../tag/tag';
import Tag from '../tag/tag';

type Item = {
  title: ReactNode;
  hint?: ReactNode;
  href?: string;
  status?: TagProps;
};

type TaskListProps = {
  items: Item[];
  className?: string;
};

export function TaskList({ className, items }: TaskListProps) {
  return (
    <div className={clsx('govuk-task-list', className)}>
      {items.map(({ title, hint, href, status }, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={clsx('govuk-task-list__item', {
            'govuk-task-list__item--with-link': !!href,
          })}
        >
          <div className="govuk-task-list__name-and-hint">
            {href
              ? (
                  <Link
                    className="govuk-link govuk-task-list__link"
                    href={href}
                  >
                    {title}
                  </Link>
                )
              : (
                  <div>{title}</div>
                )}
          </div>
          {hint && (
            <div className="govuk-task-list__hint">{hint}</div>
          )}
          {status && <Tag {...status} />}
        </li>
      ))}
    </div>
  );
}

export default TaskList;
