"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  priceRange: string;
  services: string[];
  description: string;
  isPopular?: boolean;
  affiliateUrl: string;
}

export default function ProviderCard({
  id,
  name,
  image,
  rating,
  reviewCount,
  location,
  priceRange,
  services,
  description,
  isPopular = false,
  affiliateUrl
}: ProviderCardProps) {

  const handleViewDetails = () => {
    console.log("View details clicked for provider:", id);
  };

  const handleAffiliateClick = () => {
    console.log("Affiliate link clicked for provider:", id);
    // In a real app, this would track the affiliate click
  };

  return (
    <Card className="hover-elevate flex flex-col overflow-hidden" data-testid={`card-provider-${id}`}>
      <CardHeader className="p-0">
        {/* Provider Image */}
        <div className="relative h-48">
          <img
            src={image}
            alt={`${name} office space`}
            className="w-full h-full object-cover"
          />
          {isPopular && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground" data-testid="badge-popular">
              Popular
            </Badge>
          )}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
            <div className="flex items-center text-white text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-300 ml-1">({reviewCount})</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6">
        <div className="space-y-3">
          {/* Provider Name and Location */}
          <div className="min-h-[72px]">
            <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2" data-testid={`text-provider-name-${id}`}>
              {name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1" data-testid={`text-location-${id}`}>{location}</span>
            </div>
          </div>

          {/* Price Range */}
          <div className="text-lg font-semibold text-primary min-h-[28px]" data-testid={`text-price-${id}`}>
            {priceRange}
          </div>

          {/* Services */}
          <div className="min-h-[80px]">
            <p className="text-sm font-medium text-foreground mb-2">Services:</p>
            <div className="flex flex-wrap gap-1">
              {services.slice(0, 4).map((service, index) => (
                <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-service-${index}-${id}`}>
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 min-h-[60px]" data-testid={`text-description-${id}`}>
            {description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleViewDetails}
            data-testid={`button-view-details-${id}`}
          >
            View Details
          </Button>
          <Button
            className="flex-1"
            onClick={handleAffiliateClick}
            data-testid={`button-get-pricing-${id}`}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Get Pricing
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}