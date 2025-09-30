"use client";

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';
import ExpandableProviderCard from './ExpandableProviderCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png";
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png";

// Placeholder images to cycle through
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
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  pricing: {
    monthlyRate: number;
    currency: string;
  };
  amenities: string[];
  services: string[];
  images: string[];
  status: string;
  featured: boolean;
}

interface ApiResponse {
  success: boolean;
  data: OfficeData[];
  total: number;
}

interface OfficesListProps {
  className?: string;
  onOfficeSelect?: (coordinates: { lat: number; lng: number }) => void;
}

export default function OfficesList({ 
  className = "h-full overflow-hidden flex flex-col",
  onOfficeSelect
}: OfficesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  // Fetch offices from API
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/offices'],
  });

  // Transform and filter office data
  const offices = useMemo(() => {
    if (!data?.data) return [];

    let transformed = data.data.map((office, index) => {
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
      
      // Format price from markdown pricing data
      const priceRange = lowestPrice > 0 
        ? `From $${lowestPrice}/mo`
        : 'Contact for pricing';
      
      // Use image from markdown if available, otherwise use placeholder
      const image = (office.images && office.images.length > 0) 
        ? office.images[0] 
        : placeholderImages[index % placeholderImages.length];
      
      // Extract popular areas from amenities or create default
      const popularAreas = office.amenities && office.amenities.length > 0
        ? office.amenities.slice(0, 3)
        : [districtName || 'Downtown Orlando'];
      
      // Use excerpt from markdown or generate description
      const description = office.excerpt || office.description || 
        `Professional virtual office solutions in ${districtName || city} with comprehensive business support and modern amenities.`;
      
      return {
        id: office.id,
        name: office.displayName || office.name,
        image,
        location,
        address: office.location?.address,
        priceRange,
        priceValue: lowestPrice,
        popularAreas,
        services: office.services || office.amenities?.slice(0, 4) || [],
        amenities: office.amenities || [],
        description,
        isPopular: office.featured,
        affiliateUrl: `/offices/${office.id}`,
        coordinates: office.location?.coordinates
      };
    });

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      transformed = transformed.filter(office => 
        office.name.toLowerCase().includes(search) ||
        office.location.toLowerCase().includes(search) ||
        office.address?.toLowerCase().includes(search) ||
        office.popularAreas.some(area => area.toLowerCase().includes(search))
      );
    }

    // Apply sorting
    transformed.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.priceValue - b.priceValue;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return transformed;
  }, [data, searchTerm, sortBy]);

  return (
    <div className={className} data-testid="offices-list">
      {/* Search and Sort Header */}
      <div className="flex-shrink-0 p-4 border-b bg-background space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search offices, locations, or areas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-offices"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-select" className="text-sm text-muted-foreground">Sort:</Label>
            <Select
              value={sortBy}
              onValueChange={(value: 'name' | 'price') => setSortBy(value)}
            >
              <SelectTrigger className="w-32" data-testid="select-sort-by">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Results Count */}
          <div className="text-sm text-muted-foreground" data-testid="text-results-count">
            {offices.length} office{offices.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Office Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="offices-cards-container">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Skeleton className="w-full h-48" />
                </CardHeader>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-5 w-24 mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : error ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-medium mb-2">Failed to load offices</h3>
            <p className="text-sm">Please try again later</p>
          </div>
        ) : offices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-medium mb-2">No offices found</h3>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        ) : (
          offices.map((office) => (
            <ExpandableProviderCard 
              key={office.id} 
              {...office} 
              onSelect={onOfficeSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}
