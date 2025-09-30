import { NextResponse } from 'next/server';
import { readAllContentFiles, ensureContentDirectories } from '../../../server/contentUtils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const provider = searchParams.get('provider');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Ensure content directories exist
    ensureContentDirectories();
    
    // Get all office content files
    const officeFiles = readAllContentFiles('offices');
    
    // Transform to API format
    let offices = officeFiles.map(file => ({
      id: file.slug,
      slug: file.slug,
      name: file.data.name || file.slug,
      displayName: file.data.displayName || file.data.name || file.slug,
      description: file.data.description || '',
      excerpt: file.data.excerpt || file.data.description || '',
      
      // Provider information
      providerId: file.data.providerId || '',
      providerName: file.data.providerName || '',
      
      // Location details
      location: {
        address: file.data.address || '',
        city: file.data.city || 'Orlando',
        state: file.data.state || 'FL',
        zipCode: file.data.zipCode || '',
        district: file.data.district || '',
        coordinates: file.data.coordinates || null,
        floor: file.data.floor || null,
        suite: file.data.suite || null
      },
      
      // Office details
      officeDetails: {
        size: file.data.size || null,
        capacity: file.data.capacity || null,
        officeType: file.data.officeType || 'virtual',
        furnished: file.data.furnished || false,
        privateOffice: file.data.privateOffice || false,
        sharedSpace: file.data.sharedSpace || true
      },
      
      // Pricing
      pricing: {
        monthlyRate: file.data.pricing?.mailOnly || file.data.pricing?.allInclusive || file.data.monthlyRate || 0,
        setupFee: file.data.setupFee || 0,
        depositRequired: file.data.depositRequired || false,
        currency: file.data.pricing?.currency || file.data.currency || 'USD',
        billingCycle: file.data.pricing?.period || file.data.billingCycle || 'monthly'
      },
      
      // Services and amenities
      services: file.data.services || [],
      amenities: file.data.amenities || [],
      
      // Features
      features: {
        mailHandling: file.data.mailHandling || false,
        phoneAnswering: file.data.phoneAnswering || false,
        meetingRooms: file.data.meetingRooms || false,
        receptionist: file.data.receptionist || false,
        businessLounge: file.data.businessLounge || false,
        parking: file.data.parking || false,
        wifiIncluded: file.data.wifiIncluded || true
      },
      
      // Availability
      availability: {
        available: file.data.available !== false,
        moveInDate: file.data.moveInDate || null,
        leaseTerms: file.data.leaseTerms || []
      },
      
      // Media
      images: file.data.images || [],
      virtualTour: file.data.virtualTour || null,
      
      // Contact
      contact: {
        phone: file.data.contactPhone || '',
        email: file.data.contactEmail || '',
        website: file.data.website || ''
      },
      
      // SEO
      metaDescription: file.data.metaDescription || file.data.description || '',
      
      // Status
      status: file.data.status || 'active',
      featured: file.data.featured || false,
      
      // Timestamps
      createdAt: file.data.createdAt || new Date().toISOString(),
      updatedAt: file.data.updatedAt || new Date().toISOString(),
      listedAt: file.data.listedAt || file.data.createdAt || new Date().toISOString()
    }));
    
    // Filter by district if specified
    if (district) {
      offices = offices.filter(office => 
        office.location.district?.toLowerCase() === district.toLowerCase()
      );
    }
    
    // Filter by provider if specified
    if (provider) {
      offices = offices.filter(office => 
        office.providerId?.toLowerCase() === provider.toLowerCase() ||
        office.providerName?.toLowerCase().includes(provider.toLowerCase())
      );
    }
    
    // Filter by featured if specified
    if (featured) {
      offices = offices.filter(office => office.featured === true);
    }
    
    // Filter out inactive offices unless specifically requested
    offices = offices.filter(office => office.status === 'active' || office.status === 'available');
    
    // Apply pagination
    const total = offices.length;
    const paginatedOffices = offices.slice(offset, offset + limit);
    
    return NextResponse.json({
      success: true,
      data: paginatedOffices,
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    });
  } catch (error) {
    console.error('Error fetching offices:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch offices',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}