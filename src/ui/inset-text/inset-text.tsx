import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './inset-text.module.scss';

export function InsetText({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(styles['govuk-inset-text'], className)}
      {...props}
    />
  );
}

export default InsetText;
