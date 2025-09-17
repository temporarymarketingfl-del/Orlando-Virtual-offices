import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, List, Grid } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import LocationsList from '@/components/LocationsList';
import type { Location } from '@shared/schema';

type ViewMode = 'map' | 'list' | 'split';

export default function Locations() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>();
  const [viewMode, setViewMode] = useState<ViewMode>('split');

  const handleLocationSelect = (location: Location) => {
    setSelectedLocationId(location.id);
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'map':
        return (
          <InteractiveMap
            selectedLocationId={selectedLocationId}
            onLocationSelect={handleLocationSelect}
            className="h-full w-full"
          />
        );
      
      case 'list':
        return (
          <LocationsList
            selectedLocationId={selectedLocationId}
            onLocationSelect={handleLocationSelect}
            className="h-full w-full flex flex-col"
          />
        );
      
      case 'split':
      default:
        return (
          <>
            {/* Desktop Split View */}
            <div className="hidden lg:flex h-full">
              {/* Left Panel - Locations List */}
              <div className="w-2/5 border-r border-border">
                <LocationsList
                  selectedLocationId={selectedLocationId}
                  onLocationSelect={handleLocationSelect}
                  className="h-full flex flex-col"
                />
              </div>
              
              {/* Right Panel - Interactive Map */}
              <div className="flex-1">
                <InteractiveMap
                  selectedLocationId={selectedLocationId}
                  onLocationSelect={handleLocationSelect}
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Mobile/Tablet Stacked View */}
            <div className="lg:hidden flex flex-col h-full">
              {/* Map Section */}
              <div className="h-1/2 border-b border-border">
                <InteractiveMap
                  selectedLocationId={selectedLocationId}
                  onLocationSelect={handleLocationSelect}
                  className="h-full w-full"
                />
              </div>
              
              {/* List Section */}
              <div className="flex-1">
                <LocationsList
                  selectedLocationId={selectedLocationId}
                  onLocationSelect={handleLocationSelect}
                  className="h-full flex flex-col"
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">
              Orlando Virtual Office Locations
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="page-description">
              Explore premium business districts across Central Florida
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

      {/* Main Content */}
      <main className="flex-1 overflow-hidden" data-testid="main-content">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-border bg-background px-4 py-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Find your perfect virtual office location in Orlando's thriving business districts
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <span>✨ Interactive Map</span>
            <span>🏢 6 Districts</span>
            <span>📍 42 Providers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}