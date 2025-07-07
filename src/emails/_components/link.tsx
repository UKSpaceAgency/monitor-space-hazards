import { Link as EmailLink } from '@react-email/components';
import type { ComponentPropsWithoutRef } from 'react';

export const Link = ({ href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  return <EmailLink href={href} style={{ color: '#1d70b8', textDecoration: 'underline' }} {...props} />;
};
