"use client";

import { useEffect, useState } from 'react';
import { fetchPosts } from '../lib/sanity/fetch-posts';
import PostCard, { Post } from '@/components/blog/post-card';
import Pagination from '@/components/blog/pagination';

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Number of posts to display per page

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await fetchPosts();
      console.log('Fetched Posts:', allPosts); // Log the fetched posts
      setPosts(allPosts);
    };
    loadPosts();
  }, []);

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PostsPage;