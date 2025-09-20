"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, MapPin, Building, TrendingUp, DollarSign } from 'lucide-react';
import { ORLANDO_LOCATIONS, formatPrice } from '@/data/locationData';
import type { Location } from '@shared/schema';

interface LocationsListProps {
  selectedLocationId?: string;
  onLocationSelect?: (location: Location) => void;
  className?: string;
}

interface FilterState {
  search: string;
  priceRange: [number, number];
  minProviders: number;
  hotspotOnly: boolean;
  sortBy: 'name' | 'price' | 'providers';
}

export default function LocationsList({ 
  selectedLocationId, 
  onLocationSelect,
  className = "h-96 overflow-hidden flex flex-col"
}: LocationsListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [0, 650],
    minProviders: 0,
    hotspotOnly: false,
    sortBy: 'name'
  });

  // Filter and sort locations based on current filters
  const filteredLocations = useMemo(() => {
    let filtered = ORLANDO_LOCATIONS.filter(location => {
      // Search filter (city name, state, popular areas)
      const searchTerms = filters.search.toLowerCase();
      const matchesSearch = !searchTerms || 
        location.cityName.toLowerCase().includes(searchTerms) ||
        location.stateName.toLowerCase().includes(searchTerms) ||
        location.popularAreas.some(area => area.toLowerCase().includes(searchTerms)) ||
        location.keyFeatures.some(feature => feature.toLowerCase().includes(searchTerms));

      // Price range filter
      const matchesPrice = location.averagePrice >= filters.priceRange[0] && 
                          location.averagePrice <= filters.priceRange[1];

      // Provider count filter
      const matchesProviders = location.providerCount >= filters.minProviders;

      // Hotspot filter
      const matchesHotspot = !filters.hotspotOnly || location.isHotspot;

      return matchesSearch && matchesPrice && matchesProviders && matchesHotspot;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return a.averagePrice - b.averagePrice;
        case 'providers':
          return b.providerCount - a.providerCount;
        case 'name':
        default:
          return a.cityName.localeCompare(b.cityName);
      }
    });

    return filtered;
  }, [filters]);

  const handleLocationClick = (location: Location) => {
    onLocationSelect?.(location);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priceRange: [0, 650],
      minProviders: 0,
      hotspotOnly: false,
      sortBy: 'name'
    });
  };

  const hasActiveFilters = filters.search || 
                          filters.priceRange[0] > 0 || filters.priceRange[1] < 650 ||
                          filters.minProviders > 0 || 
                          filters.hotspotOnly ||
                          filters.sortBy !== 'name';

  return (
    <div className={className} data-testid="locations-list">
      {/* Search and Filter Header */}
      <div className="flex-shrink-0 p-4 border-b bg-background space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search locations, areas, or features..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-10"
            data-testid="input-search-locations"
          />
        </div>

        {/* Filter Toggle and Sort */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
            data-testid="button-toggle-filters"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">!</Badge>}
          </Button>

          <div className="flex items-center gap-2">
            <Label htmlFor="sort-select" className="text-sm text-muted-foreground">Sort:</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: 'name' | 'price' | 'providers') => 
                setFilters(prev => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="w-32" data-testid="select-sort-by">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="providers">Providers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-4 space-y-4" data-testid="filters-panel">
            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium">
                Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              </Label>
              <div className="mt-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={650}
                  min={0}
                  step={25}
                  className="w-full"
                  data-testid="slider-price-range"
                />
              </div>
            </div>

            {/* Minimum Providers */}
            <div>
              <Label className="text-sm font-medium">
                Minimum Providers: {filters.minProviders}+
              </Label>
              <div className="mt-2">
                <Slider
                  value={[filters.minProviders]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, minProviders: value[0] }))}
                  max={15}
                  min={0}
                  step={1}
                  className="w-full"
                  data-testid="slider-min-providers"
                />
              </div>
            </div>

            {/* Hotspot Only */}
            <div className="flex items-center justify-between">
              <Label htmlFor="hotspot-only" className="text-sm font-medium">
                Hotspot locations only
              </Label>
              <Switch
                id="hotspot-only"
                checked={filters.hotspotOnly}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hotspotOnly: checked }))}
                data-testid="switch-hotspot-only"
              />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full flex items-center gap-2"
                data-testid="button-clear-filters"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </Card>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground" data-testid="text-results-count">
          {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Location Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="locations-cards-container">
        {filteredLocations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-medium mb-2">No locations found</h3>
            <p className="text-sm">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          filteredLocations.map((location) => (
            <Card
              key={location.id}
              className={`hover-elevate cursor-pointer transition-all ${
                selectedLocationId === location.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleLocationClick(location)}
              data-testid={`location-card-${location.id}`}
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={location.image}
                    alt={`${location.cityName} business district`}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  {location.isHotspot && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white" data-testid={`badge-hotspot-${location.id}`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-semibold" data-testid={`card-title-${location.id}`}>
                      {location.cityName}
                    </h3>
                    <p className="text-sm text-gray-200" data-testid={`card-state-${location.id}`}>
                      {location.stateName}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                {/* Statistics */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Building className="w-4 h-4 mr-1" />
                    <span data-testid={`card-providers-${location.id}`}>
                      {location.providerCount} providers
                    </span>
                  </div>
                  <div className="flex items-center text-primary font-medium text-sm">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span data-testid={`card-price-${location.id}`}>
                      From {formatPrice(location.averagePrice)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {location.description}
                </p>

                {/* Key Features */}
                <div className="flex flex-wrap gap-1">
                  {location.keyFeatures.slice(0, 3).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs"
                      data-testid={`card-feature-${location.id}-${index}`}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}