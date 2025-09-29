import { NextResponse } from 'next/server';
import { getContentBySlug, ensureContentDirectories } from '../../../../server/contentUtils';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    ensureContentDirectories();
    
    const { slug } = params;
    const contentFile = getContentBySlug('providers', slug);
    
    if (!contentFile) {
      return NextResponse.json(
        { success: false, error: 'Provider not found' },
        { status: 404 }
      );
    }
    
    // Transform to expected API format
    const provider = {
      id: contentFile.slug,
      name: contentFile.data.name || '',
      slug: contentFile.data.slug || contentFile.slug,
      fullName: contentFile.data.fullName || contentFile.data.name || '',
      logo: contentFile.data.logo || '',
      featuredImage: contentFile.data.featuredImage || '',
      rating: contentFile.data.rating || 0,
      reviewCount: contentFile.data.reviewCount || 0,
      orlandoLocations: contentFile.data.orlandoLocations || 0,
      totalLocations: contentFile.data.totalLocations || 0,
      priceRange: contentFile.data.priceRange || '',
      basicPrice: contentFile.data.basicPrice || 0,
      premiumPrice: contentFile.data.premiumPrice || 0,
      executivePrice: contentFile.data.executivePrice || 0,
      services: contentFile.data.services || [],
      description: contentFile.data.description || '',
      keyLocations: contentFile.data.keyLocations || [],
      founded: contentFile.data.founded || '',
      globalPresence: contentFile.data.globalPresence || '',
      specialties: contentFile.data.specialties || [],
      isPopular: contentFile.data.isPopular || false,
      affiliateUrl: contentFile.data.affiliateUrl || '',
      features: contentFile.data.features || {},
      benefits: contentFile.data.benefits || [],
      contactInfo: contentFile.data.contactInfo || {},
      content: contentFile.html,
      status: contentFile.data.status || 'active',
      createdAt: contentFile.data.createdAt,
      updatedAt: contentFile.data.updatedAt
    };
    
    return NextResponse.json({
      success: true,
      data: provider
    });
  } catch (error) {
    console.error('Error fetching provider:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch provider' },
      { status: 500 }
    );
  }
}