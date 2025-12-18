import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { FragmentationPage } from '@/components/fragmentation/FragmentationPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation');
  const { shortId } = await params;
  const event = await getFragmentationEvent(shortId);
  return {
    title: t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` }),
  };
}

export default async function Fragmentation({
  params,
}: PageProps) {
  notFound();
  const t = await getTranslations('Fragmentation');
  const { shortId } = await params;

  return (
    <div>
      <NotificationBanner heading={t.rich('notification_banner', {
        edit: chunks => <Link className="govuk-link" href={`/fragmentations/${shortId}//edit`}>{chunks}</Link>,
        send: chunks => <Link className="govuk-link" href={`/fragmentations/${shortId}/send-alert`}>{chunks}</Link>,
      })}
      />
      <FragmentationPage shortId={shortId} />
    </div>
  );
}
