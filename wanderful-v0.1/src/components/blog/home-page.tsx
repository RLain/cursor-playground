"use client"; // Ensure this is a client component

import { useEffect, useState } from 'react';
import { fetchPosts } from '../../lib/sanity/fetch-posts'; // Adjust the import based on your fetch function
import PostCard from './post-card';
import { Post } from '@/src/types/post';

const BlogHomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts(); // Fetch posts from your data source
      setPosts(fetchedPosts);
      setLoading(false);
    };

    getPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post) => (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105" key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogHomePage;
