import { render } from '@react-email/render';

import ConjunctionClosedownEmail from '@/emails/conjunction-closedown';

export async function POST(
  request: Request,
) {
  try {
    const { report } = await request.json();

    if (!report) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<ConjunctionClosedownEmail report={report} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
