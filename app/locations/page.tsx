"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, List, Grid } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import OfficesList from '@/components/OfficesList';
import type { Location } from '@shared/schema';

type ViewMode = 'map' | 'list' | 'split';

// Custom hook for media query
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // Initialize with the actual media query result on first render
    return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    console.log('Media query initialized:', query, 'matches:', media.matches);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
      console.log('Media query updated:', matches, '->', media.matches);
    }
    
    const listener = () => {
      console.log('Media query changed:', media.matches);
      setMatches(media.matches);
    };
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]); // Fixed: removed 'matches' from deps to avoid unnecessary re-runs

  return matches;
}

export default function Locations() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>();
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number }>();
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // lg breakpoint

  const handleLocationSelect = (location: Location) => {
    setSelectedLocationId(location.id);
  };

  const handleOfficeSelect = (coordinates: { lat: number; lng: number }) => {
    setSelectedCoordinates(coordinates);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 flex items-center justify-between py-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">
              Orlando Virtual Office Locations
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="page-description">
              Explore premium virtual offices across Central Florida
            </p>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 py-2 h-auto"
                data-testid="button-view-list"
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === 'split' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('split')}
                className="px-3 py-2 h-auto"
                data-testid="button-view-split"
              >
                <Grid className="w-4 h-4 mr-1" />
                Split
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="px-3 py-2 h-auto"
                data-testid="button-view-map"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Map
              </Button>
            </div>

            {/* Mobile View Toggle */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                data-testid="button-toggle-mobile-view"
              >
                {viewMode === 'map' ? (
                  <>
                    <List className="w-4 h-4 mr-1" />
                    List
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-1" />
                    Map
                  </>
                )}
              </Button>
            </div>

            {/* Selected Location Badge */}
            {selectedLocationId && (
              <Badge 
                variant="outline" 
                className="ml-2"
                data-testid="badge-selected-location"
              >
                Selected
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Single map instance always mounted, controlled with CSS Grid */}
      <main className="flex-1 overflow-hidden" data-testid="main-content">
        <div className="max-w-[1280px] mx-auto w-full h-full px-4 md:px-8">
          <div 
            className={`
              h-full transition-all duration-200
            ${viewMode === 'map' ? 'grid grid-cols-1' : ''}
            ${viewMode === 'list' ? 'grid grid-cols-1' : ''}
            ${viewMode === 'split' ? (
              isLargeScreen 
                ? 'grid grid-cols-[2fr_3fr]' 
                : 'grid grid-rows-[1fr_1fr]'
            ) : ''}
          `}
        >
          {/* Single OfficesList instance - always mounted */}
          <div 
            className={`
              ${viewMode === 'map' ? 'hidden' : ''}
              ${viewMode === 'list' ? 'block' : ''}
              ${viewMode === 'split' ? 'block' : ''}
              ${isLargeScreen && viewMode === 'split' ? 'border-r border-border' : ''}
              ${!isLargeScreen && viewMode === 'split' ? 'border-b border-border' : ''}
            `}
          >
            <OfficesList
              className="h-full flex flex-col"
              onOfficeSelect={handleOfficeSelect}
            />
          </div>

          {/* Single InteractiveMap instance - always mounted */}
          <div 
            className={`
              ${viewMode === 'list' ? 'hidden' : ''}
              ${viewMode === 'map' ? 'block' : ''}
              ${viewMode === 'split' ? 'block' : ''}
            `}
          >
            <InteractiveMap
              key="single-persistent-map"
              selectedLocationId={selectedLocationId}
              selectedCoordinates={selectedCoordinates}
              onLocationSelect={handleLocationSelect}
              className="h-full w-full"
              viewMode={viewMode}
              isLargeScreen={isLargeScreen}
            />
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-border bg-background px-4 py-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Find your perfect virtual office location in Orlando's thriving business districts
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <span>✨ Interactive Map</span>
            <span>🏢 Virtual Offices</span>
            <span>📍 Multiple Providers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}