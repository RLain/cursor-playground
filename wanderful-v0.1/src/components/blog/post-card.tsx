import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity/client';
import { Post } from '@/types/post';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Button } from '../ui/button';

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle>
        <Link href={`/posts/${encodeURIComponent(post.slug.current)}`}>
          {post.title}
        </Link>
      </CardTitle>
      <CardDescription>
        {new Date(post.publishedAt).toLocaleDateString()}
      </CardDescription>
    </CardHeader>

    {post.mainImage && (
      <CardContent>
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.mainImage.alt ?? 'Post image'}
          className="w-full h-48 object-cover rounded-lg"
          width={600}
          height={400}
        />
      </CardContent>
    )}

    <CardFooter className="mt-auto">
      <Button variant="link" asChild>
        <Link href={`/posts/${encodeURIComponent(post.slug.current)}`}>
          Read more →
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default PostCard; 