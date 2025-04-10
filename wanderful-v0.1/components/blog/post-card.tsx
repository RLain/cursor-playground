// components/blog/post-card.tsx
import { PortableText, PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity/client'

export interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  publishedAt: string;
  body: PortableTextBlock[];
  categories: string[];
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  console.log('PostCard:', post);
  return (
    <div className="border rounded-lg p-4">
      <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </Link>
      <p>{post.publishedAt}</p>
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.mainImage.alt || 'Post Image'}
          className="w-full h-auto rounded-lg mb-4"
          width={600}
          height={400}
        />
      )}
      <div>
        <PortableText value={post.body} />
      </div>      {/* <p>Estimated read time: {calculateReadTime(post.body)} min</p> */}
      {/* <div className="flex flex-wrap">
        {post.categories.map((category: string) => (
          <span key={category} className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 mr-2">
            {category}
          </span>
        ))}
      </div> */}
    </div>
  );
};

// The post body is a complex nested array....
// const calculateReadTime = (text: string | undefined): number => {
//   console.log('Calculating read time for:', text);
//   if (!text) return 0; // Return 0 if text is undefined or empty
//   const words = text.split(' ').length;
//   return Math.ceil(words / 200); // Assuming an average reading speed of 200 wpm
// };

export default PostCard;