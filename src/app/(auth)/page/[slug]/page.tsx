import { ContentNavigation } from '@/components/ContentNavigation';
import { HtmlMapper } from '@/components/HtmlMapper';
import { getPage } from '@/libs/Cms';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  return {
    title: page.title,
  };
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
