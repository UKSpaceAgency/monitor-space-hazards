import type { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Auth0 from 'next-auth/providers/auth0';

import type { TypeUserRole } from '@/__generated__/data-contracts';
import fetchUser from '@/auth/getUser';
import { env } from '@/libs/Env';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Session {
    user: {
      /** The user's postal address. */
      role: TypeUserRole | null;
      setup_completed: boolean;
    } & DefaultSession['user'];
    access_token: string | null;
  }

  // eslint-disable-next-line ts/consistent-type-definitions
  interface Account {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  // eslint-disable-next-line ts/consistent-type-definitions
  interface JWT {
    role: TypeUserRole | null;
    setup_completed: boolean;
    access_token: string;
    expires_at: number;
    refresh_token?: string;
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const params = new URLSearchParams({
      client_id: env.AUTH0_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token ?? '',
    });

    const response = await fetch(`${env.AUTH0_BASEURL}/oauth/token`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: params,
    });

    const tokensOrError = await response.json();

    if (!response.ok) {
      throw tokensOrError;
    }

    const newTokens = tokensOrError as {
      access_token: string;
      expires_in: number;
      refresh_token?: string;
    };

    token.access_token = newTokens.access_token;
    token.expires_at = Math.floor(
      Date.now() / 1000 + newTokens.expires_in,
    );

    return token;
  } catch (error) {
    console.error('Error refreshing access_token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const { handlers, signIn, signOut, auth, unstable_update: update } = NextAuth({
  providers: [
    Auth0({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_BASEURL,
      authorization: {
        params: {
          scope: 'openid email profile offline_access',
          audience: env.AUTH0_AUDIENCE,
        },
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      if (auth && !auth.user.setup_completed && !request.nextUrl.pathname.includes('account')) {
        return Response.redirect(new URL('/account/setup', request.nextUrl.origin));
      }

      if (request.nextUrl.pathname === '/data-privacy-notice'
        || request.nextUrl.pathname === '/cookies'
        || request.nextUrl.pathname === '/contact-analyst'
      ) {
        return true;
      }

      if (request.nextUrl.pathname === '/' && auth) {
        const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') ?? '/home';
        return Response.redirect(new URL(callbackUrl, request.nextUrl.origin));
      }
      return !!auth;
    },
    async jwt({ token, account, trigger }) {
      if (trigger === 'signIn' || trigger === 'update') {
        const updatedToken = {
          ...token,
        };
        if (account) {
          updatedToken.access_token = account.access_token;
          updatedToken.refresh_token = account.refresh_token;
          if (account.expires_at) {
            updatedToken.expires_at = account.expires_at;
          }
        }
        try {
          const data = await fetchUser(updatedToken.access_token);
          if (data.role) {
            updatedToken.role = data.role;
          }
          updatedToken.setup_completed = data.setup_completed;
        } catch (error) {
          console.error('Error fetching me user', error);
        }
        return updatedToken;
      } else if (Date.now() < token.expires_at * 1000) {
      // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        if (!token.refresh_token) {
          throw new TypeError('Missing refresh_token');
        }
        return await refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role,
        setup_completed: token.setup_completed,

      };
      session.access_token = token.access_token;
      return session;
    },
    async redirect(params: { url: string; baseUrl: string }) {
      const { url, baseUrl } = params;
      if (!url.startsWith('http')) {
        return url;
      }

      const { pathname, search, hash } = new URL(url);

      return Promise.resolve(
        new URL(`${pathname}${search}${hash}`, baseUrl).href,
      );
    },
  },
});
