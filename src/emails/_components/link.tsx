import { Link as EmailLink } from '@react-email/components';
import type { ComponentPropsWithoutRef } from 'react';

export const Link = ({ href, style, ...props }: ComponentPropsWithoutRef<'a'>) => {
  return <EmailLink href={href} style={{ color: '#006ebb', textDecoration: 'underline', ...style }} {...props} />;
};
