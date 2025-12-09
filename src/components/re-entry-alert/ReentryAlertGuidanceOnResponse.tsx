import { useTranslations } from 'next-intl';

import type { TypeRisk } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/utils/Risk';

import { Markdown } from '../Markdown';

type ReentryAlertGuidanceOnResponseProps = {
  risk?: TypeRisk | null;
  immediateResponseComment?: string | null;
  dataPdf?: string;
};

const ReentryAlertGuidanceOnResponse = ({ risk, immediateResponseComment, dataPdf }: ReentryAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Reentry_alert.Guidance_on_response');

  const riskLevel = risk?.toLowerCase() as 'low' | 'medium' | 'high' || 'low';

  return (
    <div data-pdf={dataPdf}>
      {t.rich(`risk.${riskLevel}`, {
        tag: chunks => renderRiskTag(chunks as TypeRisk),
      })}
      {immediateResponseComment && <Markdown>{immediateResponseComment}</Markdown>}
    </div>
  );
};

export { ReentryAlertGuidanceOnResponse };
