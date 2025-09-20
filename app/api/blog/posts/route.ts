import { NextResponse } from 'next/server';
import { getPublishedPosts, getPostsByCategory, getPostsByAuthor } from '@/data/blogData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const authorId = searchParams.get('authorId');
    const limitParam = searchParams.get('limit');
    
    let posts = getPublishedPosts();
    
    // Apply filters - compose them properly
    if (categoryId || authorId) {
      posts = posts.filter(post => {
        const matchesCategory = !categoryId || post.categoryId === categoryId;
        const matchesAuthor = !authorId || post.authorId === authorId;
        return matchesCategory && matchesAuthor;
      });
    }
    
    // Sort by published date (newest first) BEFORE applying limit
    posts.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
    
    // Apply limit with validation
    if (limitParam) {
      const limitNum = parseInt(limitParam);
      if (isNaN(limitNum) || limitNum < 1) {
        return NextResponse.json(
          { success: false, error: 'Limit must be a positive integer' },
          { status: 400 }
        );
      }
      const clampedLimit = Math.min(limitNum, 100); // Max 100 posts
      posts = posts.slice(0, clampedLimit);
    }
    
    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}