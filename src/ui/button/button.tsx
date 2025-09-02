import type { UrlObject } from 'node:url';

import clsx from 'clsx';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ForwardedRef } from 'react';
import { forwardRef } from 'react';

export type LinkProps = CommonButtonProps & {
  as: 'link';
  href: string | UrlObject;
};

export type ButtonProps = CommonButtonProps & {
  as?: 'button';
  href?: never; // not allowed for button
};

export type CommonButtonProps = {
  variant?: 'secondary' | 'warning';
  isStartButton?: true;
  text?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLElement, ButtonProps | LinkProps>((
  { isStartButton, variant, className, href, as = 'button', ...props },
  ref,
) => {
  const startIcon = (
    <svg
      className="govuk-button__start-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  );

  const classes = clsx('govuk-button', className, {
    'govuk-button--start': isStartButton,
    'govuk-button--secondary': variant === 'secondary',
    'govuk-button--warning': variant === 'warning',
  });

  const {
    disabled,
    children,
    ...rest
  } = props;

  if (as === 'link' && href) {
    return <Link ref={ref as ForwardedRef<HTMLAnchorElement>} className={classes} href={href}>{children}</Link>;
  }

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      type="button"
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
      {isStartButton && startIcon}
    </button>
  );
});

export default Button;
