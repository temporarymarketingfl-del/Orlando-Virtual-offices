import { NextResponse } from 'next/server';
import { getContentBySlug, ensureContentDirectories, calculateReadingTime, getViewCount, incrementViewCount } from '../../../../../server/contentUtils';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    ensureContentDirectories();
    
    const { slug } = params;
    const contentFile = getContentBySlug('blog', slug);
    
    if (!contentFile) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Transform to expected API format
    const post = {
      id: contentFile.slug,
      title: contentFile.data.title || '',
      slug: contentFile.data.slug || contentFile.slug,
      content: contentFile.html,
      excerpt: contentFile.data.excerpt || '',
      featuredImage: contentFile.data.featuredImage || '',
      authorId: contentFile.data.author || '',
      categoryId: contentFile.data.category || '',
      tags: contentFile.data.tags || [],
      status: contentFile.data.status || 'published',
      publishedAt: contentFile.data.publishedAt || contentFile.data.createdAt,
      createdAt: contentFile.data.createdAt,
      updatedAt: contentFile.data.updatedAt,
      readingTime: contentFile.data.readingTime || calculateReadingTime(contentFile.content),
      viewCount: getViewCount('blog', contentFile.slug),
      metaDescription: contentFile.data.metaDescription || contentFile.data.excerpt || ''
    };
    
    // Get author details if authorId exists
    let author = null;
    if (post.authorId) {
      const authorFile = getContentBySlug('authors', post.authorId);
      if (authorFile) {
        author = {
          id: authorFile.slug,
          name: authorFile.data.name || '',
          bio: authorFile.data.bio || '',
          avatar: authorFile.data.avatar || '',
          email: authorFile.data.email || '',
          socialLinks: JSON.stringify(authorFile.data.socialLinks || {}),
          slug: authorFile.data.slug || authorFile.slug,
          isActive: authorFile.data.isActive !== false,
          createdAt: authorFile.data.createdAt
        };
      }
    }
    
    // Get category details if categoryId exists
    let category = null;
    if (post.categoryId) {
      category = {
        id: post.categoryId,
        name: contentFile.data.categoryName || post.categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug: post.categoryId,
        description: contentFile.data.categoryDescription || '',
        color: contentFile.data.categoryColor || '#6366f1'
      };
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...post,
        author,
        category
      }
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Increment view count for a blog post
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    ensureContentDirectories();
    
    const { slug } = params;
    
    // Safely parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { action } = body;
    
    if (action !== 'increment_view') {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Expected "increment_view"' },
        { status: 400 }
      );
    }
    
    const contentFile = getContentBySlug('blog', slug);
    
    if (!contentFile) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Increment view count using in-memory storage
    const newViewCount = incrementViewCount('blog', slug);
    
    return NextResponse.json({
      success: true,
      data: {
        viewCount: newViewCount
      }
    });
  } catch (error) {
    console.error('Error updating blog post view count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update view count' },
      { status: 500 }
    );
  }
}