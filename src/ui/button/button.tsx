import clsx from 'clsx';
import type { ForwardedRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ButtonProps<T> = {
  variant?: 'secondary' | 'warning';
  href?: string;
  isStartButton?: true;
  element?: 'button' | 'link' | 'input';
  text?: string;
  disabled?: true;
} & HTMLAttributes<T>;

export const Button = forwardRef<HTMLElement, ButtonProps<HTMLAnchorElement | HTMLButtonElement | HTMLInputElement>>((
  props,
  ref,
) => {
  const {
    element,
    variant,
    href,
    isStartButton,
    text,
    disabled,
    children,
    ...rest
  } = props;

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

  const className = clsx('govuk-button', {
    'govuk-button--start': isStartButton,
    'govuk-button--secondary': variant === 'secondary',
    'govuk-button--warning': variant === 'warning',
  });

  if (element === 'input' && ref instanceof HTMLInputElement) {
    return (
      <input
        ref={ref as ForwardedRef<HTMLInputElement>}
        className={className}
        value={text}
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}
      />
    );
  }

  if (element === 'link') {
    return (
      <a
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        className={className}
        href={href ?? '#'}
        role="button"
        draggable="false"
        {...rest}
      >
        {children}
        {isStartButton && startIcon}
      </a>
    );
  }

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      type="button"
      className={className}
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
