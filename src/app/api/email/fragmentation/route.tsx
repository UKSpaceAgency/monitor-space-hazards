import { render } from '@react-email/render';

import { getFragmentationEventScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import FragmentationEmail from '@/emails/fragmentation';

export async function POST(
  request: Request,
) {
  try {
    const { event, report } = await request.json();

    if (!event || !report) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const screeningResults = await getFragmentationEventScreeningResults(report.presigned_url);

    const html = await render(<FragmentationEmail event={event} report={report} screeningResults={screeningResults} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
