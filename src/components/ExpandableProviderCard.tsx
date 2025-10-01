"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, DollarSign, Building2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useExpandable } from "@/hooks/use-expandable";
import opusLogo from "@assets/providers/Opus-Logo.svg";

interface ExpandableProviderCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  address?: string;
  priceRange: string;
  providerCount?: number;
  popularAreas?: string[];
  services?: string[];
  amenities?: string[];
  description?: string;
  isPopular?: boolean;
  affiliateUrl?: string;
  coordinates?: { lat: number; lng: number };
  onSelect?: (coordinates: { lat: number; lng: number }) => void;
}

export default function ExpandableProviderCard({
  id,
  name,
  image,
  location,
  address,
  priceRange,
  providerCount,
  popularAreas = [],
  services = [],
  amenities = [],
  description,
  isPopular = false,
  affiliateUrl,
  coordinates,
  onSelect
}: ExpandableProviderCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  const handleClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    toggleExpand();
  };

  const handleViewOnMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onSelect) {
      onSelect(coordinates);
    }
  };

  const handleCTA = () => {
    if (affiliateUrl) {
      window.location.href = affiliateUrl;
    }
  };

  return (
    <Card
      className="hover-elevate cursor-pointer transition-all duration-300 overflow-hidden"
      onClick={handleClick}
      data-testid={`card-expandable-${id}`}
    >
      <CardHeader className="p-0 relative">
        {/* Office Image */}
        <div className="relative h-48">
          <img
            src={image}
            alt={`${name} office space`}
            className="w-full h-full object-cover"
            data-testid={`img-office-${id}`}
          />
          
          {/* Provider Logo */}
          {name.toLowerCase().includes('opus') && (
            <div className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-md">
              <img
                src={typeof opusLogo === 'string' ? opusLogo : opusLogo.src}
                alt="Opus Virtual Offices"
                className="h-8 w-auto"
                data-testid={`img-provider-logo-${id}`}
              />
            </div>
          )}
          
          {/* Popular Badge - Bottom Left */}
          {isPopular && (
            <Badge 
              className="absolute bottom-3 left-3 bg-primary text-primary-foreground" 
              data-testid="badge-popular"
            >
              Popular
            </Badge>
          )}
          
          {providerCount && (
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-md px-3 py-1">
              <div className="flex items-center text-white text-sm">
                <Building2 className="w-4 h-4 mr-1" />
                <span className="font-medium">{providerCount} providers</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-3">
          {/* Name and Location - Always Visible */}
          <div>
            <h3 
              className="text-xl font-semibold text-foreground mb-2" 
              data-testid={`text-name-${id}`}
            >
              {name}
            </h3>
            <div className="flex items-start text-muted-foreground text-sm mb-1">
              <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
              <span data-testid={`text-location-${id}`}>
                {address || location}
              </span>
            </div>
          </div>

          {/* Price and Actions - Always Visible */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-primary">
              <DollarSign className="w-5 h-5" />
              <span className="text-lg font-semibold" data-testid={`text-price-${id}`}>
                {priceRange}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {coordinates && onSelect && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewOnMap}
                  className="h-8"
                  data-testid={`button-view-on-map-${id}`}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  View on Map
                </Button>
              )}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                data-testid={`icon-expand-${id}`}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>

          {/* Popular Areas - Always Visible if available */}
          {popularAreas.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Popular areas:</p>
              <div className="flex flex-wrap gap-1">
                {popularAreas.slice(0, 3).map((area, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs"
                    data-testid={`badge-area-${index}-${id}`}
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Expandable Content */}
          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-4"
                    data-testid={`expanded-content-${id}`}
                  >
                    {/* Services */}
                    {services.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-1">
                          {services.map((service, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs"
                              data-testid={`badge-service-${index}-${id}`}
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Amenities */}
                    {amenities.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Amenities:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {amenities.slice(0, 6).map((amenity, index) => (
                            <div 
                              key={index} 
                              className="flex items-center text-sm text-muted-foreground"
                              data-testid={`amenity-${index}-${id}`}
                            >
                              <CheckCircle2 className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {description && (
                      <div>
                        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-description-${id}`}>
                          {description}
                        </p>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div>
                      <Button
                        className="w-full"
                        onClick={handleCTA}
                        data-cta="true"
                        data-testid={`button-view-details-${id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
