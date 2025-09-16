import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building2, TrendingUp } from "lucide-react";
import cityImage1 from "@assets/generated_images/Downtown_business_district_58542a85.png";
import cityImage2 from "@assets/generated_images/Modern_office_building_hero_3a280a24.png";

export default function NeighborhoodDeepDive() {
  const neighborhoods = [
    {
      name: "Downtown Orlando",
      image: cityImage1,
      description: "Orlando's central business district and financial hub with prestigious Orange Avenue addresses",
      priceRange: "$149 - $599",
      providers: 12,
      keyFeatures: ["Financial District", "Government Center", "Entertainment District"],
      demographics: "Corporate headquarters, law firms, financial services",
      bestFor: "Established businesses seeking prestigious addresses",
      highlights: [
        "Home to Orlando City Hall and Orange County Government",
        "Walking distance to Amway Center and Dr. Phillips Center",
        "Premium business addresses on Orange Avenue",
        "Extensive public transportation connections"
      ]
    },
    {
      name: "Lake Nona Medical City",
      image: cityImage2,
      description: "Orlando's fastest-growing tech and medical district, perfect for innovative companies",
      priceRange: "$129 - $549",
      providers: 8,
      keyFeatures: ["Medical City", "Tech Hub", "Innovation District"],
      demographics: "Healthcare, biotechnology, tech startups",
      bestFor: "Healthcare and technology companies",
      highlights: [
        "Home to UCF College of Medicine and Nemours Children's Hospital",
        "Growing tech ecosystem with major corporate relocations",
        "Modern infrastructure and smart city initiatives",
        "Close proximity to Orlando International Airport"
      ]
    },
    {
      name: "Dr. Phillips",
      image: cityImage1,
      description: "Upscale business corridor known for Restaurant Row and high-end commercial spaces",
      priceRange: "$99 - $459",
      providers: 5,
      keyFeatures: ["Restaurant Row", "Luxury Shopping", "Corporate Parks"],
      demographics: "Hospitality, retail, professional services",
      bestFor: "Customer-facing businesses and hospitality companies",
      highlights: [
        "Premier dining and entertainment destination",
        "High-income residential area nearby",
        "Easy access to Universal Studios and I-Drive",
        "Established business community with networking opportunities"
      ]
    },
    {
      name: "Millenia",
      image: cityImage2,
      description: "International business district with global connectivity and luxury retail",
      priceRange: "$169 - $489",
      providers: 7,
      keyFeatures: ["International District", "Luxury Retail", "Convention Access"],
      demographics: "International business, tourism, retail",
      bestFor: "Companies with international clients or tourism focus",
      highlights: [
        "Minutes from Orlando International Airport",
        "Home to The Mall at Millenia luxury shopping",
        "Major hotel and convention center proximity",
        "International business community presence"
      ]
    },
    {
      name: "Winter Park",
      image: cityImage1,
      description: "Historic and cultural business district with upscale Park Avenue commercial area",
      priceRange: "$189 - $629",
      providers: 6,
      keyFeatures: ["Historic District", "Cultural Center", "Park Avenue"],
      demographics: "Arts, culture, boutique businesses, consulting",
      bestFor: "Creative agencies, consultants, and boutique firms",
      highlights: [
        "Prestigious Park Avenue business addresses",
        "Rich arts and cultural scene",
        "Affluent client base and networking opportunities",
        "Historic charm with modern business amenities"
      ]
    },
    {
      name: "MetroWest",
      image: cityImage2,
      description: "Growing business community with affordable options and easy highway access",
      priceRange: "$89 - $329",
      providers: 4,
      keyFeatures: ["Affordable Options", "Highway Access", "Growing Community"],
      demographics: "Small business, startups, service companies",
      bestFor: "Startups and cost-conscious businesses",
      highlights: [
        "Most affordable virtual office options in Orlando",
        "Excellent highway access to all of Central Florida",
        "Growing residential and business community",
        "Flexible office solutions for scaling businesses"
      ]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="neighborhood-dive-title">
            Orlando Business Districts Deep Dive
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="neighborhood-dive-description">
            Each Orlando business district offers unique advantages for virtual office clients. 
            Find the perfect neighborhood that aligns with your business goals and target market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {neighborhoods.map((neighborhood, index) => (
            <Card key={index} className="hover-elevate overflow-hidden" data-testid={`neighborhood-card-${index}`}>
              <div className="aspect-video relative">
                <img
                  src={neighborhood.image}
                  alt={`${neighborhood.name} business district in Orlando showing modern commercial buildings and business environment`}
                  className="w-full h-full object-cover"
                  data-testid={`neighborhood-image-${index}`}
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground" data-testid={`neighborhood-providers-${index}`}>
                    {neighborhood.providers} Providers
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="default" data-testid={`neighborhood-price-${index}`}>
                    {neighborhood.priceRange}/month
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid={`neighborhood-title-${index}`}>
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  {neighborhood.name}
                </CardTitle>
                <p className="text-muted-foreground" data-testid={`neighborhood-description-${index}`}>
                  {neighborhood.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.keyFeatures.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs" data-testid={`neighborhood-feature-${index}-${featureIndex}`}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2" data-testid={`neighborhood-industries-title-${index}`}>
                    <Users className="w-4 h-4" aria-hidden="true" />
                    Typical Industries
                  </h4>
                  <p className="text-sm text-muted-foreground" data-testid={`neighborhood-demographics-${index}`}>{neighborhood.demographics}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2" data-testid={`neighborhood-best-for-title-${index}`}>
                    <Building2 className="w-4 h-4" aria-hidden="true" />
                    Best For
                  </h4>
                  <p className="text-sm text-muted-foreground" data-testid={`neighborhood-best-for-${index}`}>{neighborhood.bestFor}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2" data-testid={`neighborhood-highlights-title-${index}`}>
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    District Highlights
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {neighborhood.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start gap-2" data-testid={`neighborhood-highlight-${index}-${highlightIndex}`}>
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-3" data-testid="neighborhood-help-title">
                Need Help Choosing the Right District?
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="neighborhood-help-description">
                Our Orlando business specialists can help you select the perfect virtual office location 
                based on your industry, budget, and business goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}