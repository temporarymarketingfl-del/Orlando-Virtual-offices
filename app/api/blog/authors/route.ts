import { NextResponse } from 'next/server';
import { mockAuthors } from '@/data/blogData';

export async function GET() {
  try {
    // Filter to only active authors
    const activeAuthors = mockAuthors.filter(author => author.isActive);
    
    return NextResponse.json({
      success: true,
      data: activeAuthors,
      total: activeAuthors.length
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch authors' },
      { status: 500 }
    );
  }
}