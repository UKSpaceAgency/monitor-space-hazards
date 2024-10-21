import NextAuth from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_BASEURL,
      authorization: {
        params: {
          scope: 'openid email profile offline_access',
          audience: process.env.AUTH0_AUDIENCE,
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
});
