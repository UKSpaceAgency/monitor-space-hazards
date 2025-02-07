import { createBucketClient } from '@cosmicjs/sdk';
import { notFound } from 'next/navigation';

import { env } from './Env';

const bucket = createBucketClient({
  bucketSlug: env.COSMIC_BUCKET_SLUG || '',
  readKey: env.COSMIC_READ_KEY || '',
});

type Page = {
  slug: string;
  title: string;
  created_at: Date;
  content: string;
  metadata?: {
    content_navigation?: boolean;
  };
};

export async function getPages(): Promise<Array<Pick<Page, 'slug'>>> {
  const data = await bucket.objects
    .find({
      type: 'pages',
    })
    .props('slug');
  return data.objects;
}

export async function getPage(slug: string) {
  try {
    const { object } = await bucket.objects
      .findOne({ type: 'pages', slug })
      .props(['slug,title,metadata,created_at,content']);
    return object;
  } catch {
    notFound();
  }
}
