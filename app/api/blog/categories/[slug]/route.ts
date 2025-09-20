import { NextResponse } from 'next/server';
import { getCategoryBySlug, getPostsByCategory } from '@/data/blogData';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const category = getCategoryBySlug(slug);
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Get category's published posts
    const posts = getPostsByCategory(category.id);
    
    return NextResponse.json({
      success: true,
      data: {
        ...category,
        posts,
        postCount: posts.length
      }
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}