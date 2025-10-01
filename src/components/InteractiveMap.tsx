"use client";

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Building } from 'lucide-react';
import { ORLANDO_CENTER, DEFAULT_ZOOM } from '@/data/locationData';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import PopupCard from '@/components/PopupCard';

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
  contact: {
    phone: string;
    email: string;
    website: string;
  };
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
                <PopupCard
                  id={office.id}
                  name={office.displayName || office.name}
                  address={office.location?.address || ''}
                  affiliateUrl={office.contact?.website || ''}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}