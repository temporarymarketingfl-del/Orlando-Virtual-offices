"use client";

import Link from "next/link";
import { Building2, Star } from "lucide-react";
import NavDropdown, { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./NavDropdown";

// Interface for providers
interface Provider {
  id: string;
  name: string;
  priceRange: string;
  rating: number;
  isPopular: boolean;
  location: string;
}

// Current providers data (extracted from PopularProviders.tsx)
const providers: Provider[] = [
  {
    id: "regus-downtown-orlando",
    name: "Regus Downtown Orlando",
    priceRange: "$149 - $599/month",
    rating: 4.6,
    isPopular: true,
    location: "Downtown, Orlando, FL"
  },
  {
    id: "wework-lake-nona",
    name: "WeWork Lake Nona",
    priceRange: "$129 - $549/month",
    rating: 4.4,
    isPopular: true,
    location: "Lake Nona, Orlando, FL"
  },
  {
    id: "orlando-executive-center",
    name: "Orlando Executive Center",
    priceRange: "$99 - $459/month",
    rating: 4.3,
    isPopular: false,
    location: "Dr. Phillips, Orlando, FL"
  }
];

export default function ProvidersDropdown() {
  return (
    <NavDropdown label="Providers" align="start">
      <DropdownMenuLabel>Orlando Virtual Office Providers</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {providers.map((provider) => (
        <DropdownMenuItem key={provider.id} asChild>
          <Link 
            href={`/locations?provider=${provider.id}`}
            className="flex items-center justify-between w-full cursor-pointer"
            data-testid={`link-provider-${provider.id}`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{provider.name}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{provider.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{provider.priceRange}</span>
                </div>
              </div>
            </div>
            {provider.isPopular && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </Link>
        </DropdownMenuItem>
      ))}
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem asChild>
        <Link 
          href="/providers"
          className="flex items-center justify-center w-full cursor-pointer text-primary font-medium"
          data-testid="link-all-providers"
        >
          View All Providers
        </Link>
      </DropdownMenuItem>
    </NavDropdown>
  );
}