import { NextResponse } from 'next/server';
import { getAllContent, ensureContentDirectories, ContentFile } from '../../../../server/contentUtils';

export async function GET() {
  try {
    ensureContentDirectories();
    
    // Get all blog posts to calculate category counts
    const blogPosts = getAllContent('blog', { published: true });
    
    // Extract unique categories from blog posts
    const categoryMap = new Map();
    
    blogPosts.forEach((post: ContentFile) => {
      const categorySlug = post.data.category;
      if (categorySlug) {
        if (!categoryMap.has(categorySlug)) {
          categoryMap.set(categorySlug, {
            id: categorySlug,
            name: post.data.categoryName || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            slug: categorySlug,
            description: post.data.categoryDescription || '',
            color: post.data.categoryColor || '#6366f1',
            postCount: 0
          });
        }
        const category = categoryMap.get(categorySlug);
        category.postCount++;
      }
    });
    
    const categories = Array.from(categoryMap.values());
    
    return NextResponse.json({
      success: true,
      data: categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}