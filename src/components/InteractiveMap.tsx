"use client";

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building, DollarSign } from 'lucide-react';
import { ORLANDO_CENTER, DEFAULT_ZOOM } from '@/data/locationData';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

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

// Fix for default marker icons in React Leaflet using ESM-safe imports
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// Custom marker icons for offices
const createOfficeIcon = (isFeatured: boolean) => {
  const color = isFeatured ? '#548ea1' : '#3b82f6'; // Primary color for featured, blue for regular
  const borderColor = isFeatured ? '#548ea1' : '#3b82f6';
  
  return L.divIcon({
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background-color: white; border: 2px solid ${borderColor}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); display: flex; align-items: center; justify-content: center;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${color};"></div>
        </div>
        ${isFeatured ? `<div style="position: absolute; top: -4px; right: -4px; width: 12px; height: 12px; background-color: #548ea1; border-radius: 50%; border: 1px solid white;"></div>` : ''}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Helper component to set the map reference
function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<LeafletMap | null> }) {
  const map = useMap();
  
  useEffect(() => {
    mapRef.current = map;
    console.log('Map created and ref set via useMap');
  }, [map, mapRef]);
  
  return null;
}

interface InteractiveMapProps {
  selectedLocationId?: string;
  selectedCoordinates?: { lat: number; lng: number };
  onLocationSelect?: (officeId: string) => void;
  className?: string;
  viewMode?: string;
  isLargeScreen?: boolean;
}

export default function InteractiveMap({ 
  selectedLocationId,
  selectedCoordinates,
  onLocationSelect,
  className = "h-96 w-full",
  viewMode,
  isLargeScreen
}: InteractiveMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  // Fetch offices from API
  const { data: officesData } = useQuery<ApiResponse>({
    queryKey: ['/api/offices'],
  });

  // Invalidate map size when view mode OR screen size changes (as recommended by architect)
  useEffect(() => {
    if (mapRef.current && (viewMode || isLargeScreen !== undefined)) {
      console.log('Layout changed - viewMode:', viewMode, 'isLargeScreen:', isLargeScreen, '- invalidating map size');
      // Small delay to ensure CSS transitions complete
      const timer = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          console.log('Map size invalidated after layout change');
        }
      }, 250);
      
      return () => clearTimeout(timer);
    }
  }, [viewMode, isLargeScreen]);

  // Center map on selected coordinates when they change
  useEffect(() => {
    if (mapRef.current && selectedCoordinates) {
      const lat = Number(selectedCoordinates.lat);
      const lng = Number(selectedCoordinates.lng);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        console.log('Centering map on office coordinates:', lat, lng);
        const coords: [number, number] = [lat, lng];
        
        mapRef.current.whenReady(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
            mapRef.current.setView(coords, 15, {
              animate: true,
              duration: 1.0,
            });
          }
        });
      }
    }
  }, [selectedCoordinates]);

  const handleMarkerClick = (officeId: string) => {
    onLocationSelect?.(officeId);
  };

  return (
    <div className={className} data-testid="interactive-map">
      <MapContainer
        center={[ORLANDO_CENTER.lat, ORLANDO_CENTER.lng]}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full rounded-lg"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <MapRefSetter mapRef={mapRef} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {officesData?.data?.filter(office => !!office.location?.coordinates).map((office) => {
          const lat = Number(office.location!.coordinates!.lat);
          const lng = Number(office.location!.coordinates!.lng);
          
          if (isNaN(lat) || isNaN(lng)) return null;
          
          const districtName = office.location?.district
            ?.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') || '';
          
          return (
            <Marker
              key={office.id}
              position={[lat, lng]}
              icon={createOfficeIcon(office.featured)}
              eventHandlers={{
                click: () => handleMarkerClick(office.id),
              }}
            >
              <Popup closeOnClick={false} className="custom-popup">
                <Card className="border-0 shadow-none min-w-72" data-testid={`popup-card-${office.id}`}>
                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-base text-foreground" data-testid={`popup-title-${office.id}`}>
                          {office.displayName || office.name}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {districtName}
                        </p>
                      </div>
                      {office.featured && (
                        <Badge className="bg-primary text-primary-foreground text-xs" data-testid={`popup-featured-${office.id}`}>
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-3 pt-0 space-y-2">
                    {office.images && office.images.length > 0 && (
                      <img
                        src={office.images[0]}
                        alt={office.displayName || office.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      {office.location?.address}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span data-testid={`popup-price-${office.id}`} className="text-sm">
                        {office.pricing?.monthlyRate > 0 ? `From $${office.pricing.monthlyRate}/mo` : 'Contact for pricing'}
                      </span>
                    </div>
                    
                    {office.amenities && office.amenities.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {office.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                              data-testid={`popup-amenity-${office.id}-${index}`}
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      className="w-full mt-2"
                      size="sm"
                      onClick={() => window.location.href = `/offices/${office.id}`}
                      data-testid={`popup-view-${office.id}`}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}