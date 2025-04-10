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
