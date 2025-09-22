"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import NavDropdown, { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./NavDropdown";

// Interface for featured locations from CMS
interface FeaturedLocation {
  id: string;
  cityName: string;
  stateName: string;
  isHotspot: boolean;
  providerCount: number;
  averagePrice: string;
}

// Featured locations data (can be moved to CMS later)
const featuredLocations: FeaturedLocation[] = [
  {
    id: "downtown-orlando",
    cityName: "Downtown Orlando",
    stateName: "Orlando, FL",
    isHotspot: true,
    providerCount: 12,
    averagePrice: "$199"
  },
  {
    id: "lake-nona",
    cityName: "Lake Nona",
    stateName: "Orlando, FL",
    isHotspot: true,
    providerCount: 8,
    averagePrice: "$179"
  },
  {
    id: "winter-park",
    cityName: "Winter Park",
    stateName: "Orlando, FL",
    isHotspot: false,
    providerCount: 6,
    averagePrice: "$229"
  },
  {
    id: "millenia",
    cityName: "Millenia",
    stateName: "Orlando, FL",
    isHotspot: true,
    providerCount: 7,
    averagePrice: "$169"
  }
];

export default function LocationsDropdown() {
  return (
    <NavDropdown label="Locations" align="start">
      <DropdownMenuLabel>Featured Orlando Areas</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {featuredLocations.map((location) => (
        <DropdownMenuItem key={location.id} asChild>
          <Link 
            href={`/locations?area=${location.id}`}
            className="flex items-center justify-between w-full cursor-pointer"
            data-testid={`link-location-${location.id}`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{location.cityName}</span>
                <span className="text-xs text-muted-foreground">
                  {location.providerCount} providers • From {location.averagePrice}
                </span>
              </div>
            </div>
            {location.isHotspot && (
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                Hot
              </span>
            )}
          </Link>
        </DropdownMenuItem>
      ))}
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem asChild>
        <Link 
          href="/locations?filter=featured"
          className="flex items-center justify-between w-full cursor-pointer text-primary font-medium"
          data-testid="link-all-featured-locations"
        >
          <span>See all featured locations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </DropdownMenuItem>
    </NavDropdown>
  );
}