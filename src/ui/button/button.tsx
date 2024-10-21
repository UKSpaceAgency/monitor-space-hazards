import clsx from 'clsx';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ButtonProps = {
  variant?: 'secondary' | 'warning';
  href?: string;
  isStartButton?: true;
  text?: string;
  disabled?: true;
} & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & {
    element: 'button';
  })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & {
    element: 'link';
  })
  | (InputHTMLAttributes<HTMLInputElement> & {
    element: 'input';
  })
);

export const Button = forwardRef<HTMLElement, ButtonProps>((
  { isStartButton, variant, ...props },
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

  const className = clsx('govuk-button', {
    'govuk-button--start': isStartButton,
    'govuk-button--secondary': variant === 'secondary',
    'govuk-button--warning': variant === 'warning',
  });

  if (props.element === 'input') {
    const {
      href,
      text,
      disabled,
      children,
      ...rest
    } = props;
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

  if (props.element === 'link') {
    const {
      href,
      children,
      ...rest
    } = props;
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

  const {
    disabled,
    children,
    ...rest
  } = props;

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
