import { NextResponse } from 'next/server';
import { mockCategories, getPostsByCategory } from '@/data/blogData';

export async function GET() {
  try {
    // Add post count for each category
    const categoriesWithCounts = mockCategories.map(category => ({
      ...category,
      postCount: getPostsByCategory(category.id).length
    }));
    
    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
      total: categoriesWithCounts.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}