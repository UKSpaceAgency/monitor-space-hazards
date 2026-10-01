import { Section as EmailSection } from '@react-email/components';

import { createEmailTranslator } from '@/emails/_utils/utils';

import { Separator } from '../separator';
import { Text } from '../text';

type ReentryAnalysisProcessProps = {
  analysisProcess?: string | null;
};

export const ReentryAnalysisProcess = ({ analysisProcess }: ReentryAnalysisProcessProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Analysis_process' });

  return (
    <EmailSection className="!w-full">
      <Separator />
      <Text className="mb-0">
        {t.rich('content', {
          // The analysis process ("Standard" or "UKSA Enhanced") is not yet exposed by
          // the API, so the placeholder covers both until the field is available.
          process: () => <b>{analysisProcess ?? t('placeholder')}</b>,
        })}
      </Text>
    </EmailSection>
  );
};
