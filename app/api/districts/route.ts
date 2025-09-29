import { NextResponse } from 'next/server';
import { readAllContentFiles, ensureContentDirectories } from '../../../server/contentUtils';

export async function GET() {
  try {
    // Ensure content directories exist
    ensureContentDirectories();
    
    // Get all district content files
    const districtFiles = readAllContentFiles('districts');
    
    // Transform to API format
    const districts = districtFiles.map(file => ({
      id: file.slug,
      slug: file.slug,
      name: file.data.name || file.slug,
      displayName: file.data.displayName || file.data.name || file.slug,
      description: file.data.description || '',
      excerpt: file.data.excerpt || file.data.description || '',
      
      // Location details
      location: {
        city: file.data.city || 'Orlando',
        state: file.data.state || 'FL',
        zipCodes: file.data.zipCodes || [],
        coordinates: file.data.coordinates || null
      },
      
      // Business metrics
      businessMetrics: {
        totalBusinesses: file.data.totalBusinesses || 0,
        averageRent: file.data.averageRent || 0,
        occupancyRate: file.data.occupancyRate || 0,
        marketGrowth: file.data.marketGrowth || 0
      },
      
      // Features and amenities
      features: file.data.features || [],
      amenities: file.data.amenities || [],
      transportation: file.data.transportation || [],
      
      // Related data counts
      officeCount: file.data.officeCount || 0,
      providerCount: file.data.providerCount || 0,
      
      // SEO
      metaDescription: file.data.metaDescription || file.data.description || '',
      
      // Status
      status: file.data.status || 'active',
      featured: file.data.featured || false,
      
      // Timestamps
      createdAt: file.data.createdAt || new Date().toISOString(),
      updatedAt: file.data.updatedAt || new Date().toISOString()
    }));
    
    // Filter out inactive districts unless specifically requested
    const activeDistricts = districts.filter(district => district.status === 'active');
    
    return NextResponse.json({
      success: true,
      data: activeDistricts,
      total: activeDistricts.length
    });
  } catch (error) {
    console.error('Error fetching districts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch districts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}