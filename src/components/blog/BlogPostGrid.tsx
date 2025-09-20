"use client";

import { useQuery } from "@tanstack/react-query";
import { BlogPostCard } from "./BlogPostCard";
import { BlogPost, Author, BlogCategory } from "@shared/schema";

interface BlogPostGridProps {
  posts?: BlogPost[];
  categoryId?: string;
  authorId?: string;
  limit?: number;
  showExcerpts?: boolean;
  className?: string;
}

interface BlogApiResponse {
  success: boolean;
  data: BlogPost[];
  total: number;
}

interface AuthorsApiResponse {
  success: boolean;
  data: Author[];
}

interface CategoriesApiResponse {
  success: boolean;
  data: BlogCategory[];
}

export function BlogPostGrid({
  posts,
  categoryId,
  authorId,
  limit,
  showExcerpts = true,
  className = ""
}: BlogPostGridProps) {
  // Build API query parameters
  const params = new URLSearchParams();
  if (categoryId) params.append('categoryId', categoryId);
  if (authorId) params.append('authorId', authorId);
  if (limit) params.append('limit', limit.toString());
  const queryString = params.toString();
  const postsUrl = `/api/blog/posts${queryString ? `?${queryString}` : ''}`;

  // Fetch posts if not provided directly
  const { data: postsData, isLoading: postsLoading, error: postsError } = useQuery<BlogApiResponse>({
    queryKey: [postsUrl],
    enabled: !posts, // Only fetch if posts not provided directly
  });

  // Fetch authors and categories for post enrichment
  const { data: authorsData } = useQuery<AuthorsApiResponse>({
    queryKey: ['/api/blog/authors'],
    enabled: !posts, // Only fetch if needed for data enrichment
  });

  const { data: categoriesData } = useQuery<CategoriesApiResponse>({
    queryKey: ['/api/blog/categories'],
    enabled: !posts, // Only fetch if needed for data enrichment
  });

  // Determine which posts to use
  const displayPosts = posts || postsData?.data || [];
  const authors = authorsData?.data || [];
  const categories = categoriesData?.data || [];

  // Create lookup maps for efficient author/category resolution
  const authorMap = new Map(authors.map(author => [author.id, author]));
  const categoryMap = new Map(categories.map(category => [category.id, category]));

  if (!posts && postsLoading) {
    return (
      <div className={`grid gap-6 ${className}`} data-testid="loading-blog-grid">
        {/* Loading skeleton */}
        {Array.from({ length: limit || 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted aspect-video rounded-lg mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts && postsError) {
    return (
      <div className="text-center py-12" data-testid="error-blog-grid">
        <p className="text-muted-foreground">Failed to load blog posts. Please try again later.</p>
      </div>
    );
  }

  if (displayPosts.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-blog-grid">
        <p className="text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div 
      className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`} 
      data-testid="blog-post-grid"
    >
      {displayPosts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          author={authorMap.get(post.authorId || '')}
          category={categoryMap.get(post.categoryId || '')}
          showExcerpt={showExcerpts}
        />
      ))}
    </div>
  );
}