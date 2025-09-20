import { NextResponse } from 'next/server';
import { getPostBySlug, mockAuthors, mockCategories, mockBlogPosts } from '@/data/blogData';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const post = getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Get author and category details by ID
    const author = post.authorId ? mockAuthors.find(a => a.id === post.authorId) : null;
    const category = post.categoryId ? mockCategories.find(c => c.id === post.categoryId) : null;
    
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
    
    const postIndex = mockBlogPosts.findIndex(post => post.slug === slug);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Increment view count
    mockBlogPosts[postIndex].viewCount = (mockBlogPosts[postIndex].viewCount || 0) + 1;
    
    return NextResponse.json({
      success: true,
      data: {
        viewCount: mockBlogPosts[postIndex].viewCount
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