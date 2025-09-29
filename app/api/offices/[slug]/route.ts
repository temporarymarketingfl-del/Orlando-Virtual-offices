import { NextResponse } from 'next/server';
import { getContentBySlug, ensureContentDirectories, markdownToHtml, calculateReadingTime, getViewCount, incrementViewCount } from '../../../../server/contentUtils';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Ensure content directories exist
    ensureContentDirectories();
    
    // Get the office content file
    const contentFile = getContentBySlug('offices', slug);
    
    if (!contentFile) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Office not found' 
        },
        { status: 404 }
      );
    }
    
    // Transform to API format
    const office = {
      id: contentFile.slug,
      slug: contentFile.slug,
      name: contentFile.data.name || contentFile.slug,
      displayName: contentFile.data.displayName || contentFile.data.name || contentFile.slug,
      description: contentFile.data.description || '',
      
      // Full content
      content: markdownToHtml(contentFile.content),
      excerpt: contentFile.data.excerpt || contentFile.data.description || '',
      
      // Provider information
      providerId: contentFile.data.providerId || '',
      providerName: contentFile.data.providerName || '',
      
      // Location details
      location: {
        address: contentFile.data.address || '',
        city: contentFile.data.city || 'Orlando',
        state: contentFile.data.state || 'FL',
        zipCode: contentFile.data.zipCode || '',
        district: contentFile.data.district || '',
        coordinates: contentFile.data.coordinates || null,
        floor: contentFile.data.floor || null,
        suite: contentFile.data.suite || null,
        directions: contentFile.data.directions || ''
      },
      
      // Office details
      officeDetails: {
        size: contentFile.data.size || null,
        capacity: contentFile.data.capacity || null,
        officeType: contentFile.data.officeType || 'virtual',
        furnished: contentFile.data.furnished || false,
        privateOffice: contentFile.data.privateOffice || false,
        sharedSpace: contentFile.data.sharedSpace || true,
        specifications: contentFile.data.specifications || []
      },
      
      // Pricing
      pricing: {
        monthlyRate: contentFile.data.monthlyRate || 0,
        setupFee: contentFile.data.setupFee || 0,
        depositRequired: contentFile.data.depositRequired || false,
        currency: contentFile.data.currency || 'USD',
        billingCycle: contentFile.data.billingCycle || 'monthly',
        discounts: contentFile.data.discounts || [],
        additionalFees: contentFile.data.additionalFees || []
      },
      
      // Services and amenities
      services: contentFile.data.services || [],
      amenities: contentFile.data.amenities || [],
      
      // Features
      features: {
        mailHandling: contentFile.data.mailHandling || false,
        phoneAnswering: contentFile.data.phoneAnswering || false,
        meetingRooms: contentFile.data.meetingRooms || false,
        receptionist: contentFile.data.receptionist || false,
        businessLounge: contentFile.data.businessLounge || false,
        parking: contentFile.data.parking || false,
        wifiIncluded: contentFile.data.wifiIncluded || true,
        kitchenAccess: contentFile.data.kitchenAccess || false,
        storage: contentFile.data.storage || false,
        printing: contentFile.data.printing || false
      },
      
      // Availability
      availability: {
        available: contentFile.data.available !== false,
        moveInDate: contentFile.data.moveInDate || null,
        leaseTerms: contentFile.data.leaseTerms || [],
        minimumCommitment: contentFile.data.minimumCommitment || null
      },
      
      // Media
      images: contentFile.data.images || [],
      virtualTour: contentFile.data.virtualTour || null,
      floorPlan: contentFile.data.floorPlan || null,
      
      // Contact
      contact: {
        phone: contentFile.data.contactPhone || '',
        email: contentFile.data.contactEmail || '',
        website: contentFile.data.website || '',
        contactPerson: contentFile.data.contactPerson || '',
        businessHours: contentFile.data.businessHours || {}
      },
      
      // Reviews and ratings
      reviews: {
        averageRating: contentFile.data.averageRating || 0,
        totalReviews: contentFile.data.totalReviews || 0,
        lastReviewDate: contentFile.data.lastReviewDate || null
      },
      
      // SEO
      metaDescription: contentFile.data.metaDescription || contentFile.data.description || '',
      metaKeywords: contentFile.data.metaKeywords || [],
      
      // Content metadata
      readingTime: contentFile.data.readingTime || calculateReadingTime(contentFile.content),
      viewCount: getViewCount('offices', contentFile.slug),
      
      // Status
      status: contentFile.data.status || 'active',
      featured: contentFile.data.featured || false,
      verified: contentFile.data.verified || false,
      
      // Timestamps
      createdAt: contentFile.data.createdAt || new Date().toISOString(),
      updatedAt: contentFile.data.updatedAt || new Date().toISOString(),
      listedAt: contentFile.data.listedAt || contentFile.data.createdAt || new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: office
    });
  } catch (error) {
    console.error('Error fetching office:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch office',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    
    // Handle view count increment
    if (body.action === 'view') {
      ensureContentDirectories();
      
      const contentFile = getContentBySlug('offices', slug);
      if (!contentFile) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Office not found' 
          },
          { status: 404 }
        );
      }
      
      // Increment view count
      const newViewCount = incrementViewCount('offices', slug);
      
      return NextResponse.json({
        success: true,
        data: {
          viewCount: newViewCount
        }
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid action' 
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing office action:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process action',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}