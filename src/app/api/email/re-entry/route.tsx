import { render } from '@react-email/render';
import * as Sentry from '@sentry/nextjs';

import ReEntryEmail from '@/emails/re-entry';

export async function POST(
  request: Request,
) {
  try {
    const { event, report } = await request.json();

    if (!event || !report) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    // To log something to Sentry, you can use Sentry.captureException for errors or Sentry.captureMessage for custom messages.
    // Example:
    // import * as Sentry from '@sentry/node';
    // Sentry.captureMessage('This is a log message to Sentry');
    Sentry.captureMessage(JSON.stringify({ event, report }));

    const html = await render(<ReEntryEmail event={event} report={report} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
