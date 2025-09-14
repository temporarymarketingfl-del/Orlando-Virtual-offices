import ProviderCard from "./ProviderCard";
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png";
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png";

export default function PopularProviders() {
  // todo: remove mock functionality
  const providers = [
    {
      id: "regus-manhattan",
      name: "Regus Manhattan",
      image: officeImage1,
      rating: 4.5,
      reviewCount: 127,
      location: "Manhattan, NY",
      priceRange: "$199 - $899/month",
      services: ["Virtual Office", "Meeting Rooms", "Mail Service", "Phone Answering"],
      description: "Professional virtual office solutions in the heart of Manhattan with prestigious business addresses and full-service support.",
      isPopular: true,
      affiliateUrl: "https://example.com/regus"
    },
    {
      id: "wework-austin",
      name: "WeWork Austin",
      image: officeImage2,
      rating: 4.3,
      reviewCount: 89,
      location: "Austin, TX",
      priceRange: "$149 - $749/month",
      services: ["Coworking", "Private Office", "Meeting Rooms", "Virtual Office"],
      description: "Modern coworking spaces and virtual office solutions in Austin's thriving business district with flexible membership options.",
      isPopular: true,
      affiliateUrl: "https://example.com/wework"
    },
    {
      id: "spaces-chicago",
      name: "Spaces Chicago",
      image: officeImage1,
      rating: 4.4,
      reviewCount: 156,
      location: "Chicago, IL",
      priceRange: "$179 - $699/month",
      services: ["Virtual Office", "Hot Desk", "Meeting Rooms", "Business Lounge"],
      description: "Creative workspace solutions in Chicago's Loop district, offering inspiring environments for entrepreneurs and growing businesses.",
      isPopular: false,
      affiliateUrl: "https://example.com/spaces"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="popular-providers-title">
            Popular Virtual Office Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="popular-providers-description">
            Discover top-rated virtual office providers trusted by thousands of businesses worldwide. 
            Compare features, pricing, and locations to find your perfect workspace solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} {...provider} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground rounded-lg font-medium transition-colors"
            onClick={() => console.log("View all providers clicked")}
            data-testid="button-view-all-providers"
          >
            View All Providers
          </button>
        </div>
      </div>
    </section>
  );
}