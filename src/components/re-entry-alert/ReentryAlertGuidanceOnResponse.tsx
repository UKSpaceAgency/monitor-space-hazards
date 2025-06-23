import { useTranslations } from 'next-intl';

import type { TypeReentryRisk } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/utils/Risk';

import { Markdown } from '../Markdown';

type ReentryAlertGuidanceOnResponseProps = {
  risk?: TypeReentryRisk | null;
  immediateResponse?: string | null;
  dataPdf?: string;
};

const ReentryAlertGuidanceOnResponse = ({ risk, immediateResponse, dataPdf }: ReentryAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Reentry_alert.Guidance_on_response');

  const riskLevel = risk?.toLowerCase() as 'low' | 'medium' | 'high' || 'low';

  return (
    <div data-pdf={dataPdf}>
      {immediateResponse
        ? <Markdown>{immediateResponse}</Markdown>
        : t.rich(`risk.${riskLevel}`, {
            tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
          })}
    </div>
  );
};

export { ReentryAlertGuidanceOnResponse };
