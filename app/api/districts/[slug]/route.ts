import { NextResponse } from 'next/server';
import { getContentBySlug, ensureContentDirectories, markdownToHtml, calculateReadingTime } from '../../../../server/contentUtils';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Ensure content directories exist
    ensureContentDirectories();
    
    // Get the district content file
    const contentFile = getContentBySlug('districts', slug);
    
    if (!contentFile) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'District not found' 
        },
        { status: 404 }
      );
    }
    
    // Transform to API format
    const district = {
      id: contentFile.slug,
      slug: contentFile.slug,
      name: contentFile.data.name || contentFile.slug,
      displayName: contentFile.data.displayName || contentFile.data.name || contentFile.slug,
      description: contentFile.data.description || '',
      
      // Full content
      content: markdownToHtml(contentFile.content),
      excerpt: contentFile.data.excerpt || contentFile.data.description || '',
      
      // Location details
      location: {
        city: contentFile.data.city || 'Orlando',
        state: contentFile.data.state || 'FL',
        zipCodes: contentFile.data.zipCodes || [],
        coordinates: contentFile.data.coordinates || null,
        boundaries: contentFile.data.boundaries || null
      },
      
      // Business metrics
      businessMetrics: {
        totalBusinesses: contentFile.data.totalBusinesses || 0,
        averageRent: contentFile.data.averageRent || 0,
        occupancyRate: contentFile.data.occupancyRate || 0,
        marketGrowth: contentFile.data.marketGrowth || 0,
        marketTrends: contentFile.data.marketTrends || []
      },
      
      // Features and amenities
      features: contentFile.data.features || [],
      amenities: contentFile.data.amenities || [],
      transportation: contentFile.data.transportation || [],
      nearbyAttractions: contentFile.data.nearbyAttractions || [],
      
      // Related data counts
      officeCount: contentFile.data.officeCount || 0,
      providerCount: contentFile.data.providerCount || 0,
      
      // Media
      images: contentFile.data.images || [],
      heroImage: contentFile.data.heroImage || null,
      
      // SEO
      metaDescription: contentFile.data.metaDescription || contentFile.data.description || '',
      metaKeywords: contentFile.data.metaKeywords || [],
      
      // Content metadata
      readingTime: contentFile.data.readingTime || calculateReadingTime(contentFile.content),
      
      // Status
      status: contentFile.data.status || 'active',
      featured: contentFile.data.featured || false,
      
      // Timestamps
      createdAt: contentFile.data.createdAt || new Date().toISOString(),
      updatedAt: contentFile.data.updatedAt || new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: district
    });
  } catch (error) {
    console.error('Error fetching district:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch district',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}