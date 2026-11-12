import { render } from '@react-email/render';

import ReEntryEmail from '@/emails/re-entry';
import { parseReentryEmailDistributionLevel } from '@/utils/reentryEditForm';

export async function POST(
  request: Request,
) {
  try {
    const {
      event,
      report,
      tip,
      level,
      locations_at_risk: locationsAtRisk,
    } = await request.json();

    if (!event || !report || !tip) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(
      <ReEntryEmail
        event={event}
        report={report}
        tip={tip}
        level={parseReentryEmailDistributionLevel(level)}
        locationsAtRisk={Array.isArray(locationsAtRisk) ? locationsAtRisk : []}
        withPlaceholders
      />,
    );

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
