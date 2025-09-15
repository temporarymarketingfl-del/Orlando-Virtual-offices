import LocationCard from "./LocationCard";
import cityImage1 from "@assets/generated_images/Downtown_business_district_58542a85.png";
import cityImage2 from "@assets/generated_images/Modern_office_building_hero_3a280a24.png";

export default function FeaturedLocations() {
  // todo: remove mock functionality
  const locations = [
    {
      id: "downtown-orlando",
      cityName: "Downtown Orlando",
      stateName: "Orlando, FL",
      image: cityImage1,
      providerCount: 12,
      averagePrice: "$199",
      popularAreas: ["Orange Avenue", "Church Street", "Thornton Park"],
      isHotspot: true
    },
    {
      id: "lake-nona",
      cityName: "Lake Nona",
      stateName: "Orlando, FL",
      image: cityImage2,
      providerCount: 8,
      averagePrice: "$179",
      popularAreas: ["Medical City", "Town Center", "Laureate Park"],
      isHotspot: true
    },
    {
      id: "winter-park",
      cityName: "Winter Park",
      stateName: "Orlando, FL",
      image: cityImage1,
      providerCount: 6,
      averagePrice: "$229",
      popularAreas: ["Park Avenue", "College Quarter", "Hannibal Square"],
      isHotspot: false
    },
    {
      id: "dr-phillips",
      cityName: "Dr. Phillips",
      stateName: "Orlando, FL",
      image: cityImage2,
      providerCount: 5,
      averagePrice: "$189",
      popularAreas: ["Restaurant Row", "Bay Hill", "Windermere"],
      isHotspot: false
    },
    {
      id: "millenia",
      cityName: "Millenia",
      stateName: "Orlando, FL",
      image: cityImage1,
      providerCount: 7,
      averagePrice: "$169",
      popularAreas: ["Universal Boulevard", "Turkey Lake", "International Drive"],
      isHotspot: true
    },
    {
      id: "metrowest",
      cityName: "MetroWest",
      stateName: "Orlando, FL",
      image: cityImage2,
      providerCount: 4,
      averagePrice: "$159",
      popularAreas: ["Town Center", "Hiawassee", "Colonial Drive"],
      isHotspot: false
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="featured-locations-title">
            Orlando Business Districts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="featured-locations-description">
            Explore virtual office opportunities across Orlando's premier business districts. 
            From downtown's corporate center to Lake Nona's innovative tech hub.
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
            onClick={() => console.log("Browse all Orlando areas clicked")}
            data-testid="button-browse-all-locations"
          >
            Browse All Orlando Areas
          </button>
        </div>
      </div>
    </section>
  );
}