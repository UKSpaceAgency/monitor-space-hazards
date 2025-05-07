import { useTranslations } from 'next-intl';

import type { TypeReentryRisk } from '@/__generated__/data-contracts';

type ReentryAlertGuidanceOnResponseProps = {
  risk?: TypeReentryRisk | null;
  dataPdf?: string;
};

const ReentryAlertGuidanceOnResponse = ({ risk, dataPdf }: ReentryAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Reentry_alert.Guidance_on_response');

  return (
    <div data-pdf={dataPdf}>
      {t.rich(`risk.${risk?.toLowerCase() as 'low' | 'medium' | 'high' || 'low'}`)}
    </div>
  );
};

export { ReentryAlertGuidanceOnResponse };
