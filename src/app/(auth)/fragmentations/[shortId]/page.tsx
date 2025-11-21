import { getTranslations } from 'next-intl/server';

import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { FragmentationPage } from '@/components/fragmentation/FragmentationPage';

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
  const { shortId } = await params;

  return (
    <FragmentationPage shortId={shortId} />
  );
}
