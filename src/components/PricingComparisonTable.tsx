import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Star } from "lucide-react";

export default function PricingComparisonTable() {
  const providers = [
    {
      name: "Regus Downtown Orlando",
      location: "Orange Avenue",
      basicPrice: 149,
      premiumPrice: 299,
      executivePrice: 599,
      rating: 4.6,
      reviews: 94,
      features: {
        businessAddress: true,
        mailHandling: true,
        phoneAnswering: true,
        meetingRooms: true,
        receptionistServices: true,
        businessLounge: true,
        networkingEvents: true,
        globalLocations: true,
        mobileApp: true,
        virtualReceptionist: false
      },
      popular: true
    },
    {
      name: "WeWork Lake Nona",
      location: "Medical City",
      basicPrice: 129,
      premiumPrice: 279,
      executivePrice: 549,
      rating: 4.4,
      reviews: 67,
      features: {
        businessAddress: true,
        mailHandling: true,
        phoneAnswering: true,
        meetingRooms: true,
        receptionistServices: true,
        businessLounge: true,
        networkingEvents: true,
        globalLocations: true,
        mobileApp: true,
        virtualReceptionist: false
      },
      popular: false
    },
    {
      name: "Orlando Executive Center",
      location: "Dr. Phillips",
      basicPrice: 99,
      premiumPrice: 229,
      executivePrice: 459,
      rating: 4.3,
      reviews: 112,
      features: {
        businessAddress: true,
        mailHandling: true,
        phoneAnswering: true,
        meetingRooms: true,
        receptionistServices: false,
        businessLounge: true,
        networkingEvents: false,
        globalLocations: false,
        mobileApp: false,
        virtualReceptionist: true
      },
      popular: false
    },
    {
      name: "Spaces Millenia",
      location: "International Drive",
      basicPrice: 169,
      premiumPrice: 319,
      executivePrice: 489,
      rating: 4.2,
      reviews: 58,
      features: {
        businessAddress: true,
        mailHandling: true,
        phoneAnswering: true,
        meetingRooms: true,
        receptionistServices: true,
        businessLounge: true,
        networkingEvents: true,
        globalLocations: true,
        mobileApp: true,
        virtualReceptionist: false
      },
      popular: false
    }
  ];

  const featureLabels = {
    businessAddress: "Business Address",
    mailHandling: "Mail Handling & Forwarding",
    phoneAnswering: "Phone Answering Service",
    meetingRooms: "Meeting Room Access",
    receptionistServices: "Live Receptionist",
    businessLounge: "Business Lounge Access",
    networkingEvents: "Networking Events",
    globalLocations: "Global Location Access",
    mobileApp: "Mobile App",
    virtualReceptionist: "Virtual Receptionist AI"
  };

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="pricing-comparison-title">
            Orlando Virtual Office Pricing Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="pricing-comparison-description">
            Compare features, pricing, and services across Orlando's top virtual office providers. 
            Find the perfect plan that matches your business needs and budget.
          </p>
        </div>

        {/* Mobile-first card layout for small screens */}
        <div className="lg:hidden space-y-6">
          {providers.map((provider, index) => (
            <Card key={index} className="hover-elevate" data-testid={`mobile-provider-card-${index}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  {provider.popular && (
                    <Badge variant="default" className="bg-primary" data-testid={`mobile-popular-badge-${index}`}>
                      <Star className="w-3 h-3 mr-1" aria-hidden="true" />
                      Popular
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{provider.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1" data-testid={`mobile-provider-rating-${index}`}>
                    <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                    {provider.rating} ({provider.reviews} reviews)
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center" data-testid={`mobile-basic-price-${index}`}>
                    <div className="text-sm text-muted-foreground">Basic</div>
                    <div className="text-lg font-bold">${provider.basicPrice}</div>
                  </div>
                  <div className="text-center" data-testid={`mobile-premium-price-${index}`}>
                    <div className="text-sm text-muted-foreground">Premium</div>
                    <div className="text-lg font-bold">${provider.premiumPrice}</div>
                  </div>
                  <div className="text-center" data-testid={`mobile-executive-price-${index}`}>
                    <div className="text-sm text-muted-foreground">Executive</div>
                    <div className="text-lg font-bold">${provider.executivePrice}</div>
                  </div>
                </div>
                <Button className="w-full" data-testid={`mobile-provider-button-${index}`}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop table layout */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div></div>
              {providers.map((provider, index) => (
                <Card key={index} className="hover-elevate" data-testid={`provider-header-${index}`}>
                  <CardHeader className="text-center p-4">
                    <div className="flex items-center justify-center mb-2">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      {provider.popular && (
                        <Badge variant="default" className="ml-2 bg-primary" data-testid={`desktop-popular-badge-${index}`}>
                          <Star className="w-3 h-3 mr-1" aria-hidden="true" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{provider.location}</div>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground" data-testid={`desktop-provider-rating-${index}`}>
                      <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                      {provider.rating} ({provider.reviews})
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Pricing rows */}
            <div className="space-y-4">
              {["Basic", "Premium", "Executive"].map((tier, tierIndex) => (
                <div key={tier} className="grid grid-cols-5 gap-4 items-center py-4 border-b border-border" data-testid={`pricing-tier-${tierIndex}`}>
                  <div className="font-semibold text-foreground">{tier} Plan</div>
                  {providers.map((provider, providerIndex) => (
                    <div key={providerIndex} className="text-center" data-testid={`pricing-${tier.toLowerCase()}-${providerIndex}`}>
                      <div className="text-2xl font-bold text-primary">
                        ${tierIndex === 0 ? provider.basicPrice : 
                           tierIndex === 1 ? provider.premiumPrice : 
                           provider.executivePrice}
                        <span className="text-sm text-muted-foreground">/month</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Features comparison */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Features Comparison</h3>
              <div className="space-y-3">
                {Object.entries(featureLabels).map(([featureKey, featureLabel]) => (
                  <div key={featureKey} className="grid grid-cols-5 gap-4 items-center py-2 hover:bg-muted/50 rounded-lg px-2" data-testid={`feature-row-${featureKey}`}>
                    <div className="text-sm text-foreground">{featureLabel}</div>
                    {providers.map((provider, providerIndex) => (
                      <div key={providerIndex} className="text-center" data-testid={`feature-${featureKey}-${providerIndex}`}>
                        {provider.features[featureKey as keyof typeof provider.features] ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" aria-hidden="true" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" aria-hidden="true" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-5 gap-4 mt-8">
              <div></div>
              {providers.map((provider, index) => (
                <Button key={index} className="w-full" data-testid={`provider-cta-${index}`}>
                  Get Started
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-3" data-testid="custom-quote-title">
                Need a Custom Quote?
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="custom-quote-description">
                Looking for enterprise solutions or custom packages? 
                Contact our Orlando specialists for personalized pricing.
              </p>
              <Button variant="outline" data-testid="custom-quote-button">
                Request Custom Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}