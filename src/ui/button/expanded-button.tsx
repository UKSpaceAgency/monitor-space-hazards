import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import styles from './expanded-button.module.scss';

type ExpandedButtonProps = {
  isExpanded?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ExpandedButton = forwardRef<HTMLButtonElement, ExpandedButtonProps>((
  { isExpanded, ...props },
  ref,
) => {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(styles.button, {
        [styles.open as string]: isExpanded,
      })}
      {...props}
    />
  );
});

export default ExpandedButton;
