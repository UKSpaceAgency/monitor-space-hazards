import { render } from '@react-email/render';

import AnalysisUploadEmail from '@/emails/analysis-upload';

export async function POST(
  request: Request,
) {
  try {
    const { conjunctions } = await request.json();

    if (!conjunctions) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<AnalysisUploadEmail conjunctions={conjunctions} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
