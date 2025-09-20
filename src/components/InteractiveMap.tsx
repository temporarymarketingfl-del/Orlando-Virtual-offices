"use client";

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building, TrendingUp, DollarSign } from 'lucide-react';
import { ORLANDO_LOCATIONS, ORLANDO_CENTER, DEFAULT_ZOOM, formatPrice } from '@/data/locationData';
import type { Location } from '@shared/schema';

// Fix for default marker icons in React Leaflet using ESM-safe imports
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// Custom marker icons with inline styles instead of Tailwind classes
const createCustomIcon = (isHotspot: boolean, providerCount: number) => {
  const color = isHotspot ? '#f97316' : '#3b82f6'; // Orange for hotspots, blue for regular
  const borderColor = isHotspot ? '#f97316' : '#3b82f6';
  
  return L.divIcon({
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background-color: white; border: 2px solid ${borderColor}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); display: flex; align-items: center; justify-content: center;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${color};"></div>
        </div>
        ${isHotspot ? `<div style="position: absolute; top: -4px; right: -4px; width: 12px; height: 12px; background-color: #f97316; border-radius: 50%; border: 1px solid white;"></div>` : ''}
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
  onLocationSelect?: (location: Location) => void;
  className?: string;
  viewMode?: string;
  isLargeScreen?: boolean;
}

export default function InteractiveMap({ 
  selectedLocationId, 
  onLocationSelect,
  className = "h-96 w-full",
  viewMode,
  isLargeScreen
}: InteractiveMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

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

  // Center map on selected location when it changes
  useEffect(() => {
    if (selectedLocationId && mapRef.current) {
      const location = ORLANDO_LOCATIONS.find(loc => loc.id === selectedLocationId);
      if (location && location.coordinates) {
        // Add validation to prevent NaN coordinates
        const lat = Number(location.coordinates.lat);
        const lng = Number(location.coordinates.lng);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log('Flying to location:', location.cityName, 'at coordinates:', lat, lng);
          console.log('Types:', typeof lat, typeof lng);
          console.log('Array to be passed:', [lat, lng]);
          console.log('MapRef exists:', !!mapRef.current);
          
          try {
            // Create the coordinate array and validate it one more time
            const coords: [number, number] = [lat, lng];
            console.log('Final coords array:', coords, 'Valid array elements:', coords.every(c => typeof c === 'number' && !isNaN(c)));
            
            if (mapRef.current && coords.every(c => typeof c === 'number' && !isNaN(c))) {
              // Use whenReady to ensure map is fully initialized and invalidateSize before flyTo
              mapRef.current.whenReady(() => {
                if (mapRef.current) {
                  console.log('Map is ready, calling invalidateSize and flyTo');
                  mapRef.current.invalidateSize();
                  mapRef.current.flyTo(coords, 14, {
                    animate: true,
                    duration: 1.5,
                  });
                  console.log('flyTo completed successfully');
                }
              });
            } else {
              console.error('Failed validation before flyTo:', {
                mapRefExists: !!mapRef.current,
                coordsValid: coords.every(c => typeof c === 'number' && !isNaN(c)),
                coords
              });
            }
          } catch (error) {
            console.error('Error in flyTo operation:', error);
            console.error('Coordinates at error time:', lat, lng);
          }
        } else {
          console.error('Invalid coordinates for location:', location.cityName, location.coordinates);
        }
      } else {
        console.warn('Location not found for ID:', selectedLocationId);
      }
    }
  }, [selectedLocationId]);

  const handleMarkerClick = (location: Location) => {
    onLocationSelect?.(location);
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
        
        {ORLANDO_LOCATIONS.map((location) => {
          // Validate coordinates before rendering marker
          const lat = Number(location.coordinates.lat);
          const lng = Number(location.coordinates.lng);
          
          if (isNaN(lat) || isNaN(lng)) {
            console.error('Skipping marker for location with invalid coordinates:', location.cityName, location.coordinates);
            return null;
          }
          
          return (
            <Marker
              key={location.id}
              position={[lat, lng]}
              icon={createCustomIcon(location.isHotspot, location.providerCount)}
              eventHandlers={{
                click: () => handleMarkerClick(location),
              }}
            >
            <Popup closeOnClick={false} className="custom-popup">
              <Card className="border-0 shadow-none min-w-80" data-testid={`popup-card-${location.id}`}>
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground" data-testid={`popup-title-${location.id}`}>
                        {location.cityName}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {location.stateName}
                      </p>
                    </div>
                    {location.isHotspot && (
                      <Badge className="bg-orange-500 text-white" data-testid={`popup-hotspot-${location.id}`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-3 pt-0 space-y-3">
                  {/* Image */}
                  <img
                    src={location.image}
                    alt={`${location.cityName} business district`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  
                  {/* Statistics */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Building className="w-4 h-4 mr-1" />
                      <span data-testid={`popup-providers-${location.id}`}>
                        {location.providerCount} providers
                      </span>
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span data-testid={`popup-price-${location.id}`}>
                        From {formatPrice(location.averagePrice)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {location.description}
                  </p>
                  
                  {/* Popular Areas */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Popular Areas:</p>
                    <div className="flex flex-wrap gap-1">
                      {location.popularAreas.map((area, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                          data-testid={`popup-area-${location.id}-${index}`}
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button
                    className="w-full mt-3"
                    onClick={() => handleMarkerClick(location)}
                    data-testid={`popup-explore-${location.id}`}
                  >
                    Explore {location.cityName}
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