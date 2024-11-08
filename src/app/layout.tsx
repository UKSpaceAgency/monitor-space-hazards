import '@/styles/globals.scss';

import pick from 'lodash/pick';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { AppConfig } from '@/utils/AppConfig';

export const metadata: Metadata = {
  title: {
    template: `%s | ${AppConfig.name} - GOV.UK`,
    default: `${AppConfig.name} - GOV.UK`,
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const session = await getSession();

  return (
    <html lang={locale} className="font-sans">
      <body className="govuk-template__body" suppressHydrationWarning>
        <NextIntlClientProvider messages={pick(messages, ['Tables', 'BaseTemplate', 'Forms', 'Common'])}>
          <SessionProvider>
            <BaseTemplate showNavigation={!!session}>
              {children}
            </BaseTemplate>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
