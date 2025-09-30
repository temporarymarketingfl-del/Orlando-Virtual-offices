"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Building2, Star } from "lucide-react";
import NavDropdown, { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./NavDropdown";

// Interface for provider from API
interface Provider {
  id: string;
  slug: string;
  name: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isPopular: boolean;
}

export default function ProvidersDropdown() {
  // Fetch featured providers from API
  const { data: response, isLoading } = useQuery<{ success: boolean; data: Provider[] }>({
    queryKey: ['/api/providers', { featured: true, limit: 4 }],
  });

  const providers = response?.data || [];

  return (
    <NavDropdown label="Providers" align="start">
      <DropdownMenuLabel>Featured Virtual Office Providers</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {isLoading ? (
        <div className="px-2 py-4 text-center text-sm text-muted-foreground">
          Loading providers...
        </div>
      ) : providers.length > 0 ? (
        providers.map((provider) => (
          <DropdownMenuItem key={provider.id} asChild>
            <Link 
              href={`/providers/${provider.slug}`}
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
                    {provider.priceRange && (
                      <>
                        <span>•</span>
                        <span>{provider.priceRange}</span>
                      </>
                    )}
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
        ))
      ) : (
        <div className="px-2 py-4 text-center text-sm text-muted-foreground">
          No featured providers
        </div>
      )}
      
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