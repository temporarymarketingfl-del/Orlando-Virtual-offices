"use client";

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useExpandable } from '@/hooks/use-expandable';
import opusLogo from "@assets/providers/Opus-Logo.svg";

interface PopupCardProps {
  id: string;
  name: string;
  image: string;
  address: string;
  priceRange: string;
  services?: string[];
  amenities?: string[];
  description?: string;
  isPopular?: boolean;
  affiliateUrl?: string;
}

export default function PopupCard({
  id,
  name,
  image,
  address,
  priceRange,
  services = [],
  amenities = [],
  description,
  isPopular = false,
  affiliateUrl
}: PopupCardProps) {
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

  const handleCTA = () => {
    if (affiliateUrl) {
      window.location.href = affiliateUrl;
    }
  };

  return (
    <Card 
      className="border-0 shadow-none min-w-72 cursor-pointer" 
      onClick={handleClick}
      data-testid={`popup-card-${id}`}
    >
      <CardContent className="p-0">
        {/* Image with overlays */}
        <div className="relative">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          )}
          
          {/* Opus Logo - top right */}
          {name.toLowerCase().includes("opus") && (
            <div className="absolute top-2 right-2 bg-white rounded-md p-1.5">
              <img 
                src={typeof opusLogo === 'string' ? opusLogo : opusLogo.src} 
                alt="Opus Virtual Office" 
                className="h-5 w-auto"
              />
            </div>
          )}
          
          {/* Popular Badge - bottom left */}
          {isPopular && (
            <Badge 
              className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs"
              data-testid={`popup-featured-${id}`}
            >
              Popular
            </Badge>
          )}
        </div>
        
        {/* Content */}
        <div className="p-3 space-y-3">
          {/* Name and Address */}
          <div>
            <h3 className="font-semibold text-base text-foreground line-clamp-2" data-testid={`popup-title-${id}`}>
              {name}
            </h3>
            <div className="flex items-start text-muted-foreground text-xs mt-0.5">
              <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
              <span>{address}</span>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-center text-primary">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold" data-testid={`popup-price-${id}`}>
              {priceRange}
            </span>
          </div>

          {/* See Included Features */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">See included features</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              data-testid={`icon-expand-${id}`}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>

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
                    data-testid={`popup-expanded-content-${id}`}
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
                              data-testid={`popup-service-${id}-${index}`}
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {amenities.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {amenities.slice(0, 6).map((amenity, index) => (
                            <div 
                              key={index} 
                              className="flex items-center text-sm text-muted-foreground"
                              data-testid={`popup-amenity-${id}-${index}`}
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
                        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`popup-description-${id}`}>
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
                        data-testid={`popup-view-details-${id}`}
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
