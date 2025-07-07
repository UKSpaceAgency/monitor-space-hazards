import { Text as EmailText } from '@react-email/components';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export const Text = ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => {
  return <EmailText className={clsx('text-sm mt-0', className)} {...props} />;
};
