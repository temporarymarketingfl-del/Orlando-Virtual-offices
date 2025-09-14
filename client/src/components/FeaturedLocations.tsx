import LocationCard from "./LocationCard";
import cityImage1 from "@assets/generated_images/Downtown_business_district_58542a85.png";
import cityImage2 from "@assets/generated_images/Modern_office_building_hero_3a280a24.png";

export default function FeaturedLocations() {
  // todo: remove mock functionality
  const locations = [
    {
      id: "new-york-ny",
      cityName: "New York",
      stateName: "NY",
      image: cityImage1,
      providerCount: 45,
      averagePrice: "$299",
      popularAreas: ["Manhattan", "Brooklyn", "Queens"],
      isHotspot: true
    },
    {
      id: "los-angeles-ca",
      cityName: "Los Angeles",
      stateName: "CA",
      image: cityImage2,
      providerCount: 38,
      averagePrice: "$249",
      popularAreas: ["Downtown", "Beverly Hills", "Santa Monica"],
      isHotspot: true
    },
    {
      id: "chicago-il",
      cityName: "Chicago",
      stateName: "IL",
      image: cityImage1,
      providerCount: 29,
      averagePrice: "$199",
      popularAreas: ["The Loop", "River North", "Lincoln Park"],
      isHotspot: false
    },
    {
      id: "miami-fl",
      cityName: "Miami",
      stateName: "FL",
      image: cityImage2,
      providerCount: 22,
      averagePrice: "$229",
      popularAreas: ["Brickell", "Downtown", "Coral Gables"],
      isHotspot: true
    },
    {
      id: "austin-tx",
      cityName: "Austin",
      stateName: "TX",
      image: cityImage1,
      providerCount: 18,
      averagePrice: "$179",
      popularAreas: ["Downtown", "South Austin", "Tech Ridge"],
      isHotspot: false
    },
    {
      id: "seattle-wa",
      cityName: "Seattle",
      stateName: "WA",
      image: cityImage2,
      providerCount: 25,
      averagePrice: "$259",
      popularAreas: ["Downtown", "Bellevue", "Capitol Hill"],
      isHotspot: false
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="featured-locations-title">
            Featured Locations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="featured-locations-description">
            Explore virtual office opportunities in major business hubs across the United States. 
            From bustling metropolitan areas to emerging business districts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <LocationCard key={location.id} {...location} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground rounded-lg font-medium transition-colors"
            onClick={() => console.log("Browse all locations clicked")}
            data-testid="button-browse-all-locations"
          >
            Browse All Locations
          </button>
        </div>
      </div>
    </section>
  );
}