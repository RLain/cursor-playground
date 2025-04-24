"use client";

import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../lib/sanity/fetch-posts";
import PostCard from "./post-card";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";
import { Grid as GridIcon, List as ListIcon } from "lucide-react";
import clsx from "clsx";
import { Post } from "@/types/post";

const BlogHomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    (async () => {
      const fetched = await fetchPosts();
      setPosts(fetched);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-gray-200"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with title + toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Wanderful
        </h1>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <GridIcon size={20} />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <ListIcon size={20} />
          </Button>
        </div>
      </div>

      {/* Posts container */}
      <div
        className={clsx(
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            : "flex flex-col divide-y divide-gray-200"
        )}
      >
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className={viewMode === "grid" ? "" : "py-6 px-4"}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination>
          <PaginationPrevious
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className={clsx(currentPage === 1 && "pointer-events-none opacity-50")}
          />
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className={clsx(currentPage === totalPages && "pointer-events-none opacity-50")}
          />
        </Pagination>
      </div>
    </section>
  );
};

export default BlogHomePage;