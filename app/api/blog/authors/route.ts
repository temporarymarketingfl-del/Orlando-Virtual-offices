import { NextResponse } from 'next/server';
import { getAllContent, ensureContentDirectories, ContentFile } from '../../../../server/contentUtils';

export async function GET() {
  try {
    ensureContentDirectories();
    
    // Get all authors from markdown files
    const contentFiles = getAllContent('authors', { published: true });
    
    // Transform content files to match expected API format
    const authors = contentFiles.map((file: ContentFile) => ({
      id: file.slug,
      name: file.data.name || '',
      bio: file.data.bio || '',
      avatar: file.data.avatar || '',
      email: file.data.email || '',
      socialLinks: file.data.socialLinks || {},
      slug: file.data.slug || file.slug,
      isActive: file.data.isActive !== false,
      createdAt: file.data.createdAt,
      expertise: file.data.expertise || [],
      company: file.data.company || '',
      position: file.data.position || '',
      experience: file.data.experience || '',
      location: file.data.location || ''
    }));
    
    return NextResponse.json({
      success: true,
      data: authors,
      total: authors.length
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch authors' },
      { status: 500 }
    );
  }
}