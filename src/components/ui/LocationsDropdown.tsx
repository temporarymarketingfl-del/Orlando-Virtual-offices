"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import NavDropdown, { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./NavDropdown";

// Interface for office from API
interface Office {
  id: string;
  slug: string;
  name: string;
  location: {
    district: string;
    address: string;
    city: string;
    state: string;
  };
  pricing: {
    monthlyRate: number;
  };
  featured: boolean;
}

// Interface for grouped district
interface DistrictGroup {
  id: string;
  name: string;
  displayName: string;
  officeCount: number;
  lowestPrice: number;
}

export default function LocationsDropdown() {
  // Fetch featured offices from API
  const { data: offices, isLoading } = useQuery<{ success: boolean; data: Office[] }>({
    queryKey: ['/api/offices', { featured: true }],
  });

  // Group offices by district and calculate stats
  const districts: DistrictGroup[] = offices?.data 
    ? Object.values(
        offices.data.reduce((acc, office) => {
          const district = office.location.district;
          if (!acc[district]) {
            acc[district] = {
              id: district,
              name: district,
              displayName: formatDistrictName(district),
              officeCount: 0,
              lowestPrice: Infinity
            };
          }
          acc[district].officeCount += 1;
          if (office.pricing.monthlyRate > 0 && office.pricing.monthlyRate < acc[district].lowestPrice) {
            acc[district].lowestPrice = office.pricing.monthlyRate;
          }
          return acc;
        }, {} as Record<string, DistrictGroup>)
      ).slice(0, 4) // Show top 4 districts
    : [];

  return (
    <NavDropdown label="Locations" align="start">
      <DropdownMenuLabel>Featured Orlando Areas</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {isLoading ? (
        <div className="px-2 py-4 text-center text-sm text-muted-foreground">
          Loading locations...
        </div>
      ) : districts.length > 0 ? (
        districts.map((district) => (
          <DropdownMenuItem key={district.id} asChild>
            <Link 
              href={`/locations?district=${district.id}`}
              className="flex items-center justify-between w-full cursor-pointer"
              data-testid={`link-location-${district.id}`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{district.displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {district.officeCount} {district.officeCount === 1 ? 'office' : 'offices'} • From ${district.lowestPrice}
                  </span>
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        ))
      ) : (
        <div className="px-2 py-4 text-center text-sm text-muted-foreground">
          No featured locations
        </div>
      )}
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem asChild>
        <Link 
          href="/locations"
          className="flex items-center justify-between w-full cursor-pointer text-primary font-medium"
          data-testid="link-all-locations"
        >
          <span>View All Locations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </DropdownMenuItem>
    </NavDropdown>
  );
}

// Helper function to format district names
function formatDistrictName(district: string): string {
  return district
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}