import ProviderCard from "./ProviderCard";
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png";
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png";

export default function PopularProviders() {
  // todo: remove mock functionality
  const providers = [
    {
      id: "regus-downtown-orlando",
      name: "Regus Downtown Orlando",
      image: officeImage1,
      rating: 4.6,
      reviewCount: 94,
      location: "Downtown, Orlando, FL",
      priceRange: "$149 - $599/month",
      services: ["Virtual Office", "Meeting Rooms", "Mail Service", "Phone Answering"],
      description: "Premier virtual office solutions in downtown Orlando's business district with prestigious Orange Avenue addresses and comprehensive business support.",
      isPopular: true,
      affiliateUrl: "https://example.com/regus-orlando"
    },
    {
      id: "wework-lake-nona",
      name: "WeWork Lake Nona",
      image: officeImage2,
      rating: 4.4,
      reviewCount: 67,
      location: "Lake Nona, Orlando, FL",
      priceRange: "$129 - $549/month",
      services: ["Coworking", "Private Office", "Meeting Rooms", "Virtual Office"],
      description: "Modern workspace solutions in Orlando's fastest-growing tech district, perfect for startups and established businesses in Medical City.",
      isPopular: true,
      affiliateUrl: "https://example.com/wework-lakenona"
    },
    {
      id: "orlando-executive-center",
      name: "Orlando Executive Center",
      image: officeImage1,
      rating: 4.3,
      reviewCount: 112,
      location: "Dr. Phillips, Orlando, FL",
      priceRange: "$99 - $459/month",
      services: ["Virtual Office", "Executive Suites", "Meeting Rooms", "Business Lounge"],
      description: "Upscale virtual office solutions in the Dr. Phillips business corridor, offering flexible packages for growing Central Florida businesses.",
      isPopular: false,
      affiliateUrl: "https://example.com/orlando-executive"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="popular-providers-title">
            Top Virtual Office Providers in Orlando
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="popular-providers-description">
            Discover Orlando's most trusted virtual office providers. 
            Compare features, pricing, and locations across Central Florida's premier business districts.
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