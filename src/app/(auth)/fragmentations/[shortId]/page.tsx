import { getTranslations } from 'next-intl/server';

import { FragmentationPage } from '@/components/fragmentation/FragmentationPage';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation');
  const { shortId } = await params;
  return {
    title: t('title', { shortId }),
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
