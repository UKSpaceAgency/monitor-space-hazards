import { getTranslations } from 'next-intl/server';

import Panel from '@/ui/panel/panel';

export const metadata = {
  title: 'Feedback sending complete',
};

export default async function FeedbackSuccess() {
  const t = await getTranslations('Forms.Feedback');

  return (
    <Panel heading={t('success')} />
  );
};
