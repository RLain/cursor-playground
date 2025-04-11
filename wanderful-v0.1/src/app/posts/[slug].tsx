import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchPostBySlug } from '../../lib/sanity/fetch-posts';
import { PortableText } from 'next-sanity';
import { Post } from '@/src/types/post';

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const [post, setPost] = useState<Post | null>(null); // State to hold the post data

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        const fetchedPost = await fetchPostBySlug(slug); // Fetch the post data
        setPost(fetchedPost); // Set the post data in state
      };
      fetchPost();
    }
  }, [slug]); // Run effect when slug changes

  if (!post) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div className="post-content">
        <PortableText value={post.body} />
          </div>
      </div>
  );
};

export default PostPage;
