import { pretty, render } from '@react-email/render';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import ReEntryEmail from '@/emails/re-entry-closedown';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ event: TypeReentryEventOut; report: TypeReentryEventReportOut }> },
) {
  try {
    const { event, report } = await params;

    const html = await pretty(await render(<ReEntryEmail event={event} report={report} />));

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
