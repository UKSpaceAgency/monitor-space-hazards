import { env } from '@/libs/Env';

export async function GET() {
  const returnTo = encodeURI(env.NEXTAUTH_URL);

  const url = new URL(`${env.AUTH0_BASEURL}/v2/logout?client_id=${env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`);

  return Response.redirect(url.toString());
}
