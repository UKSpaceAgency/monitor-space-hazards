import { render } from '@react-email/render';

import ReEntryClosedownEmail from '@/emails/re-entry-closedown';

export async function POST(
  request: Request,
) {
  try {
    const { event, report, tip } = await request.json();

    if (!event || !report || !tip) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<ReEntryClosedownEmail event={event} report={report} tip={tip} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
