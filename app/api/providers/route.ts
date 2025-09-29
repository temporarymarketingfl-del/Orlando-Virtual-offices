import { NextResponse } from 'next/server';
import { getAllContent, ensureContentDirectories, ContentFile } from '../../../server/contentUtils';

export async function GET(request: Request) {
  try {
    ensureContentDirectories();
    
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const popularOnly = searchParams.get('popular') === 'true';
    const sortBy = searchParams.get('sortBy') || 'name';
    
    // Get all providers from markdown files
    let contentFiles = getAllContent('providers', { 
      published: true,
      sortBy: sortBy,
      sortOrder: 'asc'
    });
    
    // Transform content files to match expected API format
    let providers = contentFiles.map((file: ContentFile) => ({
      id: file.slug,
      name: file.data.name || '',
      slug: file.data.slug || file.slug,
      fullName: file.data.fullName || file.data.name || '',
      logo: file.data.logo || '',
      featuredImage: file.data.featuredImage || '',
      rating: file.data.rating || 0,
      reviewCount: file.data.reviewCount || 0,
      orlandoLocations: file.data.orlandoLocations || 0,
      totalLocations: file.data.totalLocations || 0,
      priceRange: file.data.priceRange || '',
      basicPrice: file.data.basicPrice || 0,
      premiumPrice: file.data.premiumPrice || 0,
      executivePrice: file.data.executivePrice || 0,
      services: file.data.services || [],
      description: file.data.description || '',
      keyLocations: file.data.keyLocations || [],
      founded: file.data.founded || '',
      globalPresence: file.data.globalPresence || '',
      specialties: file.data.specialties || [],
      isPopular: file.data.isPopular || false,
      affiliateUrl: file.data.affiliateUrl || '',
      features: file.data.features || {},
      benefits: file.data.benefits || [],
      contactInfo: file.data.contactInfo || {},
      content: file.html,
      status: file.data.status || 'active',
      createdAt: file.data.createdAt,
      updatedAt: file.data.updatedAt
    }));
    
    // Apply filters
    if (popularOnly) {
      providers = providers.filter((provider: any) => provider.isPopular);
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
      const clampedLimit = Math.min(limitNum, 100); // Max 100 providers
      providers = providers.slice(0, clampedLimit);
    }
    
    return NextResponse.json({
      success: true,
      data: providers,
      total: providers.length
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}