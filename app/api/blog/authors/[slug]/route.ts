import { NextResponse } from 'next/server';
import { getAuthorBySlug, getPostsByAuthor } from '@/data/blogData';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const author = getAuthorBySlug(slug);
    
    if (!author) {
      return NextResponse.json(
        { success: false, error: 'Author not found' },
        { status: 404 }
      );
    }
    
    // Get author's published posts
    const posts = getPostsByAuthor(author.id);
    
    return NextResponse.json({
      success: true,
      data: {
        ...author,
        posts,
        postCount: posts.length
      }
    });
  } catch (error) {
    console.error('Error fetching author:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch author' },
      { status: 500 }
    );
  }
}