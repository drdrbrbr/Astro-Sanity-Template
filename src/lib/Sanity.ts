import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

const client = createClient({
  projectId: "vxvtfhhc",
  dataset: "production",
  useCdn: true,
});

type ImageUrlBuilder = ReturnType<typeof imageUrlBuilder>;

export type ImageSource = Parameters<ImageUrlBuilder["image"]>[0];

export const imageUrlFor = (source: ImageSource) =>
  imageUrlBuilder(client).image(source);

export default client;

export interface Post {
  title: string;
  slug: { current: string };
  body: PortableTextBlock[];
  mainImage?: { asset: { _ref: string } };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{title, body, mainImage}`;
  const params = { slug };
  const post = await client.fetch(query, params);
  return post;
}

export async function getAllSlugs(): Promise<{ current: string }[]> {
  const query = `*[_type == "post"]{slug}`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: { slug: { current: string } }) => slug.slug);
}

export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"]{title, slug, body, mainImage}`;
  const posts = await client.fetch(query);
  return posts;
}