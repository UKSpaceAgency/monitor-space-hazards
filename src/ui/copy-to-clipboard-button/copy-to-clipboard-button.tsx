'use client';

import type { ReactNode } from 'react';

import Button from '@/ui/button/button';

type CopyToClipboardButtonProps = {
  'textToCopy': string;
  'children': ReactNode;
  'aria-label': string;
  'className'?: string;
};

export function CopyToClipboardButton({
  textToCopy,
  children,
  'aria-label': ariaLabel,
  className,
}: CopyToClipboardButtonProps) {
  return (
    <Button
      className={className}
      aria-label={ariaLabel}
      onClick={() => navigator.clipboard.writeText(textToCopy)}
    >
      {children}
    </Button>
  );
}

export default CopyToClipboardButton;
