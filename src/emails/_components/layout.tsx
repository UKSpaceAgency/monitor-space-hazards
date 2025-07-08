import { Body, Container, Head, Html, Tailwind } from '@react-email/components';
import type { ComponentProps } from 'react';

import { Footer } from './footer';
import { Header } from './header';

export type LayoutProps = {
  title: string;
  subtitle: string;
  withPlaceholders: boolean;
} & ComponentProps<'div'>;

export function Layout({ title, subtitle, withPlaceholders, children }: LayoutProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans p-4">
          <Container>
            <Header
              title={title}
              subtitle={subtitle}
              withPlaceholders={withPlaceholders}
            />
            {children}
            <Footer withPlaceholders={withPlaceholders} />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
