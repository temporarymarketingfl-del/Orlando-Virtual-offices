"use client";

import { useQuery } from "@tanstack/react-query";
import ProviderCard from "./ProviderCard";
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png";
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Placeholder images to cycle through
const placeholderImages = [officeImage1, officeImage2];

interface OfficeData {
  id: string;
  name: string;
  displayName: string;
  location: {
    address: string;
    district: string;
  };
  pricing: {
    monthlyRate: number;
    currency: string;
  };
  amenities: string[];
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
    
    // Format location
    const districtName = office.location?.district
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || '';
    
    const location = districtName ? `${districtName}, Orlando, FL` : 'Orlando, FL';
    
    // Format price range (show a range based on the lowest price)
    const priceRange = lowestPrice > 0 
      ? `$${lowestPrice} - $${Math.round(lowestPrice * 1.5)}/month`
      : 'Contact for pricing';
    
    // Get services from amenities and features
    const services: string[] = [];
    if (office.amenities) {
      services.push(...office.amenities.slice(0, 4));
    }
    
    // Get description from excerpt or create one
    const description = `Professional virtual office solutions in ${districtName || 'Orlando'} with comprehensive business support and modern amenities.`;
    
    // Generate deterministic review count based on office ID
    const reviewCount = ((office.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100) + 50);
    
    return {
      id: office.id || office.name.toLowerCase().replace(/\s+/g, '-'),
      name: office.displayName || office.name,
      image: placeholderImages[index % placeholderImages.length],
      rating: 4.5,
      reviewCount,
      location,
      priceRange,
      services: services.length > 0 ? services : ['Virtual Office', 'Mail Service', 'Phone Answering', 'Meeting Rooms'],
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