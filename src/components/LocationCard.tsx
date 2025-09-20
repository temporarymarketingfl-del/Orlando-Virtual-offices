"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, TrendingUp } from "lucide-react";

interface LocationCardProps {
  id: string;
  cityName: string;
  stateName: string;
  image: string;
  providerCount: number;
  averagePrice: string;
  popularAreas: string[];
  isHotspot?: boolean;
}

export default function LocationCard({
  id,
  cityName,
  stateName,
  image,
  providerCount,
  averagePrice,
  popularAreas,
  isHotspot = false
}: LocationCardProps) {

  const handleExploreLocation = () => {
    console.log("Explore location clicked:", id);
  };

  return (
    <Card className="hover-elevate h-full flex flex-col group cursor-pointer" data-testid={`card-location-${id}`}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={`${cityName}, ${stateName} business district`}
            className="w-full h-40 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />
          {isHotspot && (
            <Badge className="absolute top-3 left-3 bg-orange-500 text-white" data-testid="badge-hotspot">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-lg font-semibold" data-testid={`text-city-${id}`}>
              {cityName}
            </h3>
            <p className="text-sm text-gray-200" data-testid={`text-state-${id}`}>
              {stateName}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          {/* Statistics */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground text-sm">
              <Building className="w-4 h-4 mr-1" />
              <span data-testid={`text-provider-count-${id}`}>{providerCount} providers</span>
            </div>
            <div className="text-sm font-medium text-primary" data-testid={`text-avg-price-${id}`}>
              From {averagePrice}
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <p className="text-xs font-medium text-foreground mb-2">Popular areas:</p>
            <div className="flex flex-wrap gap-1">
              {popularAreas.slice(0, 3).map((area, index) => (
                <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-area-${index}-${id}`}>
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Explore Button */}
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleExploreLocation}
            data-testid={`button-explore-${id}`}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Explore {cityName}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}