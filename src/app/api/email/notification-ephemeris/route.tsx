import { render } from '@react-email/render';

import NewEphemerisEmail from '@/emails/new-ephemeris';

export async function POST(
  request: Request,
) {
  try {
    const { common_name, norad_id } = await request.json();

    if (!common_name || !norad_id) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<NewEphemerisEmail commonName={common_name} noradId={norad_id} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
