import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Users, Building, Plane, Trophy } from "lucide-react";

export default function OrlandoBusinessAdvantages() {
  const advantages = [
    {
      icon: MapPin,
      title: "Strategic Central Florida Location",
      description: "Orlando serves as the gateway to Central Florida, offering unparalleled access to both coasts and major business centers throughout the Southeast."
    },
    {
      icon: DollarSign,
      title: "Cost-Effective Business Operations",
      description: "Enjoy significantly lower operational costs compared to Miami or Tampa, with virtual office solutions starting as low as $99/month."
    },
    {
      icon: Users,
      title: "Thriving Business Community",
      description: "Connect with over 75,000 businesses in Orlando's diverse economy, from tech startups to international corporations."
    },
    {
      icon: Building,
      title: "Prestigious Business Districts",
      description: "Establish your presence in world-class areas like Downtown Orlando, Lake Nona Medical City, and Dr. Phillips business corridor."
    },
    {
      icon: Plane,
      title: "Global Connectivity",
      description: "Orlando International Airport connects you to 850+ destinations worldwide, making client meetings and business travel seamless."
    },
    {
      icon: Trophy,
      title: "Business-Friendly Environment",
      description: "Florida's no state income tax policy and pro-business regulations create an ideal environment for company growth and expansion."
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="orlando-advantages-title">
            Why Choose Orlando for Your Virtual Office?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="orlando-advantages-description">
            Orlando offers the perfect combination of business opportunities, strategic location, and cost-effectiveness. 
            Discover why thousands of companies choose Orlando as their business headquarters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`advantage-card-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`advantage-title-${index}`}>
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`advantage-description-${index}`}>
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-primary/5 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="orlando-stats-title">
              Orlando by the Numbers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="text-center" data-testid="stat-companies">
                <div className="text-3xl font-bold text-primary">75,000+</div>
                <div className="text-sm text-muted-foreground mt-1">Businesses</div>
              </div>
              <div className="text-center" data-testid="stat-population">
                <div className="text-3xl font-bold text-primary">2.5M+</div>
                <div className="text-sm text-muted-foreground mt-1">Metro Population</div>
              </div>
              <div className="text-center" data-testid="stat-airports">
                <div className="text-3xl font-bold text-primary">850+</div>
                <div className="text-sm text-muted-foreground mt-1">Flight Destinations</div>
              </div>
              <div className="text-center" data-testid="stat-savings">
                <div className="text-3xl font-bold text-primary">25%</div>
                <div className="text-sm text-muted-foreground mt-1">Cost Savings vs Miami</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}