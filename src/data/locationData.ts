// Orlando business district location data with coordinates for map integration
import cityImage1 from "@assets/generated_images/Downtown_business_district_58542a85.png";
import cityImage2 from "@assets/generated_images/Modern_office_building_hero_3a280a24.png";
import type { Location } from "@shared/schema";

export const ORLANDO_LOCATIONS: Location[] = [
  {
    id: "downtown-orlando",
    cityName: "Downtown Orlando",
    stateName: "Orlando, FL",
    image: typeof cityImage1 === 'string' ? cityImage1 : cityImage1.src,
    providerCount: 12,
    averagePrice: 199, // Changed from "$199" to numeric 199
    popularAreas: ["Orange Avenue", "Church Street", "Thornton Park"],
    isHotspot: true,
    coordinates: {
      lat: 28.5383,
      lng: -81.3792
    },
    priceRange: {
      min: 149,
      max: 599
    },
    description: "Orlando's central business district and financial hub with prestigious Orange Avenue addresses",
    keyFeatures: ["Financial District", "Government Center", "Entertainment District"]
  },
  {
    id: "lake-nona",
    cityName: "Lake Nona",
    stateName: "Orlando, FL", 
    image: typeof cityImage2 === 'string' ? cityImage2 : cityImage2.src,
    providerCount: 8,
    averagePrice: 179, // Changed from "$179" to numeric 179
    popularAreas: ["Medical City", "Town Center", "Laureate Park"],
    isHotspot: true,
    coordinates: {
      lat: 28.380912,
      lng: -81.262896
    },
    priceRange: {
      min: 129,
      max: 549
    },
    description: "Orlando's fastest-growing tech and medical district, perfect for innovative companies",
    keyFeatures: ["Medical City", "Tech Hub", "Innovation District"]
  },
  {
    id: "winter-park",
    cityName: "Winter Park",
    stateName: "Orlando, FL",
    image: typeof cityImage1 === 'string' ? cityImage1 : cityImage1.src,
    providerCount: 6,
    averagePrice: 229, // Changed from "$229" to numeric 229
    popularAreas: ["Park Avenue", "College Quarter", "Hannibal Square"],
    isHotspot: false,
    coordinates: {
      lat: 28.5988,
      lng: -81.3583
    },
    priceRange: {
      min: 169,
      max: 649
    },
    description: "Upscale cultural and business district known for museums, boutiques, and prestigious addresses",
    keyFeatures: ["Cultural District", "Luxury Shopping", "Museums"]
  },
  {
    id: "dr-phillips",
    cityName: "Dr. Phillips",
    stateName: "Orlando, FL",
    image: typeof cityImage2 === 'string' ? cityImage2 : cityImage2.src,
    providerCount: 5,
    averagePrice: 189, // Changed from "$189" to numeric 189
    popularAreas: ["Restaurant Row", "Bay Hill", "Windermere"],
    isHotspot: false,
    coordinates: {
      lat: 28.450096,
      lng: -81.491447
    },
    priceRange: {
      min: 99,
      max: 459
    },
    description: "Upscale business corridor known for Restaurant Row and high-end commercial spaces",
    keyFeatures: ["Restaurant Row", "Luxury Shopping", "Corporate Parks"]
  },
  {
    id: "millenia",
    cityName: "Millenia",
    stateName: "Orlando, FL",
    image: typeof cityImage1 === 'string' ? cityImage1 : cityImage1.src,
    providerCount: 7,
    averagePrice: 169, // Changed from "$169" to numeric 169
    popularAreas: ["Universal Boulevard", "Turkey Lake", "International Drive"],
    isHotspot: true,
    coordinates: {
      lat: 28.485924,
      lng: -81.431190
    },
    priceRange: {
      min: 119,
      max: 479
    },
    description: "Strategic location near major attractions with excellent retail and entertainment access",
    keyFeatures: ["Tourism Hub", "Shopping Center", "Entertainment District"]
  },
  {
    id: "metrowest",
    cityName: "MetroWest",
    stateName: "Orlando, FL",
    image: typeof cityImage2 === 'string' ? cityImage2 : cityImage2.src,
    providerCount: 4,
    averagePrice: 159, // Changed from "$159" to numeric 159
    popularAreas: ["Town Center", "Hiawassee", "Colonial Drive"],
    isHotspot: false,
    coordinates: {
      lat: 28.515102, // Updated with precise coordinates from MetroWest Village
      lng: -81.485451
    },
    priceRange: {
      min: 89,
      max: 399
    },
    description: "Master-planned community with modern business facilities and convenient access to major highways",
    keyFeatures: ["Master-Planned", "Highway Access", "Modern Facilities"]
  }
];

// Orlando map center coordinates
export const ORLANDO_CENTER = {
  lat: 28.5383,
  lng: -81.3792
};

// Default zoom level for Orlando area map
export const DEFAULT_ZOOM = 11;

// Utility functions
export const getLocationById = (id: string): Location | undefined => {
  return ORLANDO_LOCATIONS.find(location => location.id === id);
};

export const getHotspotLocations = (): Location[] => {
  return ORLANDO_LOCATIONS.filter(location => location.isHotspot);
};

export const getLocationsByPriceRange = (min: number, max: number): Location[] => {
  return ORLANDO_LOCATIONS.filter(location => 
    location.priceRange.min <= max && location.priceRange.max >= min
  );
};

export const getLocationsByProviderCount = (minProviders: number): Location[] => {
  return ORLANDO_LOCATIONS.filter(location => location.providerCount >= minProviders);
};

// Helper function to format price as currency for display
export const formatPrice = (price: number): string => `$${price}`;