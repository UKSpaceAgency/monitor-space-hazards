import { notFound } from 'next/navigation';

import { ContentNavigation } from '@/components/ContentNavigation';
import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage, getPages } from '@/libs/Cms';

export async function generateStaticParams() {
  const pages = await getPages();
  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const page = await getPage(slug);
    return {
      title: page.title,
    };
  } catch {
    notFound();
  }
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { title, content, metadata } = await getPage(slug);

  return (
    <div>
      <h1 className="govuk-heading-xl">{title}</h1>
      <div className="grid md:grid-cols-4 gap-7">
        {metadata?.content_navigation && (
          <ContentNavigation />
        )}
        <div
          className={
            metadata?.content_navigation
              ? 'md:col-span-3'
              : 'md:col-span-4'
          }
        >
          <HtmlMapper content={content} />
        </div>
      </div>

    </div>
  );
}

export const revalidate = 60;
