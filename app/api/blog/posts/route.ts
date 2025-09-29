import { NextResponse } from 'next/server';
import { getAllContent, ensureContentDirectories, calculateReadingTime, ContentFile } from '../../../../server/contentUtils';

export async function GET(request: Request) {
  try {
    ensureContentDirectories();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const authorId = searchParams.get('authorId');
    const limitParam = searchParams.get('limit');
    
    // Get all blog posts from markdown files
    let contentFiles = getAllContent('blog', { 
      published: true,
      sortBy: 'publishedAt',
      sortOrder: 'desc'
    });
    
    // Transform content files to match expected API format
    let posts = contentFiles.map((file: ContentFile) => ({
      id: file.slug,
      title: file.data.title || '',
      slug: file.data.slug || file.slug,
      content: file.html,
      excerpt: file.data.excerpt || '',
      featuredImage: file.data.featuredImage || '',
      authorId: file.data.author || '',
      categoryId: file.data.category || '',
      tags: file.data.tags || [],
      status: file.data.status || 'published',
      publishedAt: file.data.publishedAt || file.data.createdAt,
      createdAt: file.data.createdAt,
      updatedAt: file.data.updatedAt,
      readingTime: file.data.readingTime || calculateReadingTime(file.content),
      viewCount: file.data.viewCount || 0,
      metaDescription: file.data.metaDescription || file.data.excerpt || ''
    }));
    
    // Apply filters
    if (categoryId || authorId) {
      posts = posts.filter((post: any) => {
        const matchesCategory = !categoryId || post.categoryId === categoryId;
        const matchesAuthor = !authorId || post.authorId === authorId;
        return matchesCategory && matchesAuthor;
      });
    }
    
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