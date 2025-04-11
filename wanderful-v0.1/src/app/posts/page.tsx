import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchPostBySlug } from '../../lib/sanity/fetch-posts';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../lib/sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Post } from '@/src/types/post';
// import RelatedPosts from '../../../components/blog/related-posts'; // Import related posts component
// import ReadingProgress from '../../../components/blog/reading-progress'; // Import reading progress component

const builder = imageUrlBuilder(client);

const urlFor = (source: SanityImageSource) => builder.image(source); // Specify the type for source

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      const slugString = Array.isArray(slug) ? slug[0] : slug;
      fetchPostBySlug(slugString).then(setPost);
    }
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <Image 
        src={urlFor(post.mainImage).url()}
        alt={post.title} 
        className="hero-imasge" 
        width={1200}
        height={800}
      />
      <h1>{post.title}</h1>
      <div className="author-section">
        <h2>About the Author</h2>
        {/* Render author bio and image */}
      </div>
      {/* <RelatedPosts categories={post.categories} />
      <ReadingProgress /> */}
      {/* <div className="estimated-read-time">Estimated Read Time: {post.readTime} min</div> */}
    </div>
  );
};

export default PostPage;
