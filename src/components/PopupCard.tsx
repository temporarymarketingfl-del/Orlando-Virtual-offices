"use client";

import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import opusLogo from "@assets/providers/Opus-Logo.svg";

interface PopupCardProps {
  id: string;
  name: string;
  address: string;
  affiliateUrl?: string;
}

export default function PopupCard({
  id,
  name,
  address,
  affiliateUrl
}: PopupCardProps) {
  const handleCTA = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (affiliateUrl) {
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      className="border-0 shadow-none min-w-64" 
      data-testid={`popup-card-${id}`}
    >
      <CardContent className="p-4 space-y-3">
        {/* Provider Logo */}
        {name.toLowerCase().includes("opus") && (
          <div className="flex justify-center">
            <img 
              src={typeof opusLogo === 'string' ? opusLogo : opusLogo.src} 
              alt="Opus Virtual Office" 
              className="h-10 w-auto"
              data-testid={`popup-logo-${id}`}
            />
          </div>
        )}
        
        {/* Location Name */}
        <h3 className="font-semibold text-lg text-foreground text-center" data-testid={`popup-title-${id}`}>
          {name}
        </h3>
        
        {/* Address */}
        <div className="flex items-start justify-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
          <span className="text-center">{address}</span>
        </div>
        
        {/* CTA Button */}
        <Button
          className="w-full"
          onClick={handleCTA}
          data-testid={`popup-get-started-${id}`}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
