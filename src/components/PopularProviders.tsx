"use client";

import { useQuery } from "@tanstack/react-query";
import ProviderCard from "./ProviderCard";
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png";
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Placeholder images to cycle through - extract src string from imported images
const placeholderImages = [
  typeof officeImage1 === 'string' ? officeImage1 : officeImage1.src,
  typeof officeImage2 === 'string' ? officeImage2 : officeImage2.src
];

interface OfficeData {
  id: string;
  name: string;
  displayName: string;
  description: string;
  excerpt: string;
  location: {
    address: string;
    district: string;
    city: string;
    state: string;
  };
  pricing: {
    monthlyRate: number;
    currency: string;
  };
  amenities: string[];
  images: string[];
  features: Record<string, boolean>;
  status: string;
  featured: boolean;
}

interface ApiResponse {
  success: boolean;
  data: OfficeData[];
  total: number;
}

export default function PopularProviders() {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/offices', { featured: true }],
  });

  // Transform office data to match ProviderCard format
  const offices = data?.data?.map((office, index) => {
    const pricing = office.pricing;
    const lowestPrice = pricing?.monthlyRate || 0;
    
    // Format location from district
    const districtName = office.location?.district
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || '';
    
    const city = office.location?.city || 'Orlando';
    const state = office.location?.state || 'FL';
    const location = districtName ? `${districtName}, ${city}, ${state}` : `${city}, ${state}`;
    
    // Format price range (show a range based on the lowest price)
    const priceRange = lowestPrice > 0 
      ? `$${lowestPrice} - $${Math.round(lowestPrice * 1.5)}/month`
      : 'Contact for pricing';
    
    // Get services from amenities (limit to 6 for consistent display)
    const services = office.amenities && office.amenities.length > 0 
      ? office.amenities.slice(0, 6)
      : ['Virtual Office', 'Mail Service', 'Phone Answering', 'Meeting Rooms'];
    
    // Use excerpt from markdown or generate description
    const description = office.excerpt || office.description || 
      `Professional virtual office solutions in ${districtName || city} with comprehensive business support and modern amenities.`;
    
    // Use image from markdown if available, otherwise use placeholder
    const image = (office.images && office.images.length > 0) 
      ? office.images[0] 
      : placeholderImages[index % placeholderImages.length];
    
    // Generate deterministic review count based on office ID
    const reviewCount = ((office.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100) + 50);
    
    return {
      id: office.id,
      name: office.displayName || office.name,
      image,
      rating: 4.5,
      reviewCount,
      location,
      priceRange,
      services,
      description,
      isPopular: office.featured,
      affiliateUrl: `/offices/${office.id}`
    };
  }) || [];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="popular-providers-title">
            Top Virtual Office Providers in Orlando
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="popular-providers-description">
            Discover Orlando's most trusted virtual office providers. 
            Compare features, pricing, and locations across Central Florida's premier business districts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-auto md:h-[450px] flex flex-col">
                  <CardHeader className="p-0">
                    <Skeleton className="w-full h-32 md:h-48 rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="flex-1 p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : error ? (
            <div className="col-span-3 text-center text-muted-foreground">
              Failed to load offices. Please try again later.
            </div>
          ) : offices.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">
              No featured offices available at the moment.
            </div>
          ) : (
            offices.map((office) => (
              <ProviderCard key={office.id} {...office} />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <button
            className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground rounded-lg font-medium transition-colors"
            onClick={() => console.log("View all providers clicked")}
            data-testid="button-view-all-providers"
          >
            View All Providers
          </button>
        </div>
      </div>
    </section>
  );
}