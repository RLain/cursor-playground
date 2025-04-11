import { client } from './client';

//TODO: Add category into this
export const fetchPosts = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    body,
    mainImage,
    tags,
    publishedAt
  }`;

  const posts = await client.fetch(query);

  console.log('fetchPosts:', posts);
  return posts;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchPostBySlug = async (slug: any) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body,
    mainImage,
    tags,
    publishedAt,
  }`;

  const post = await client.fetch(query, { slug });
  return post;
};
