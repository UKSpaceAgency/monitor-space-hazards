import { useTranslations } from 'next-intl';

import Panel from '@/ui/panel/panel';

export const metadata = {
  title: 'Feedback sending complete',
};

export default function FeedbackSuccess() {
  const t = useTranslations('Forms.Feedback');

  return (
    <Panel heading={t('success')} />
  );
};
