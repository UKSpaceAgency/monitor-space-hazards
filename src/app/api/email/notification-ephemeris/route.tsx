import { report } from 'node:process';

import { render } from '@react-email/render';

import NewEphemerisEmail from '@/emails/new-ephemeris';

export async function POST(
  request: Request,
) {
  try {
    const { commonName, noradId } = await request.json();

    if (!report) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<NewEphemerisEmail commonName={commonName} noradId={noradId} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
