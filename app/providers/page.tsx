"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Building, Users, TrendingUp, Check, X, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png";
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png";
import Image from "next/image";

export default function Providers() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Extended provider data with Orlando location counts
  const providers = [
    {
      id: "regus",
      name: "Regus",
      fullName: "Regus Downtown Orlando", 
      image: officeImage1,
      rating: 4.6,
      reviewCount: 94,
      orlandoLocations: 5,
      totalLocations: 3000,
      priceRange: "$149 - $599/month",
      basicPrice: 149,
      premiumPrice: 299,
      executivePrice: 599,
      services: ["Virtual Office", "Meeting Rooms", "Mail Service", "Phone Answering"],
      description: "Regus is the world's largest provider of flexible workspace solutions, with a strong presence in Orlando's business districts. Their downtown Orange Avenue location offers prestigious business addresses and comprehensive virtual office services.",
      keyLocations: ["Downtown Orlando", "Lake Nona", "Dr. Phillips", "Millenia", "Winter Park"],
      founded: 1989,
      globalPresence: "100+ countries",
      specialties: ["Enterprise Solutions", "Global Network", "24/7 Access"],
      isPopular: true,
      affiliateUrl: "https://example.com/regus-orlando",
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
      }
    },
    {
      id: "opus-virtual",
      name: "Opus Virtual Offices",
      fullName: "Opus Virtual Offices Orlando",
      image: officeImage2,
      rating: 4.5,
      reviewCount: 78,
      orlandoLocations: 3,
      totalLocations: 150,
      priceRange: "$89 - $399/month",
      basicPrice: 89,
      premiumPrice: 189,
      executivePrice: 399,
      services: ["Virtual Office", "Live Call Answering", "Mail Forwarding", "Meeting Rooms"],
      description: "Opus Virtual Offices provides professional virtual office solutions with live call answering services and premium Orlando business addresses. Known for exceptional customer service and flexible month-to-month plans.",
      keyLocations: ["Downtown Orlando", "Dr. Phillips", "Lake Nona"],
      founded: 2008,
      globalPresence: "50+ US cities",
      specialties: ["Live Answering", "Flexible Plans", "Customer Service"],
      isPopular: false,
      affiliateUrl: "https://example.com/opus-virtual-orlando",
      features: {
        businessAddress: true,
        mailHandling: true,
        phoneAnswering: true,
        meetingRooms: true,
        receptionistServices: true,
        businessLounge: false,
        networkingEvents: false,
        globalLocations: false,
        mobileApp: true,
        virtualReceptionist: true
      }
    },
    {
      id: "alliance-virtual",
      name: "Alliance Virtual Offices",
      fullName: "Alliance Virtual Offices Orlando",
      image: officeImage1,
      rating: 4.4,
      reviewCount: 156,
      orlandoLocations: 4,
      totalLocations: 1200,
      priceRange: "$99 - $449/month",
      basicPrice: 99,
      premiumPrice: 229,
      executivePrice: 449,
      services: ["Virtual Office", "Business Address", "Phone Services", "Conference Rooms"],
      description: "Alliance Virtual Offices is a leading provider of virtual office solutions across Orlando's key business districts. They offer comprehensive packages with professional phone answering and premium business addresses.",
      keyLocations: ["Downtown Orlando", "Millenia", "Winter Park", "Dr. Phillips"],
      founded: 1999,
      globalPresence: "700+ locations worldwide",
      specialties: ["Global Network", "Professional Services", "Established Provider"],
      isPopular: true,
      affiliateUrl: "https://example.com/alliance-virtual-orlando",
      features: {
        businessAddress: true,
        mailHandling: true,
        phoneAnswering: true,
        meetingRooms: true,
        receptionistServices: true,
        businessLounge: true,
        networkingEvents: false,
        globalLocations: true,
        mobileApp: false,
        virtualReceptionist: false
      }
    },
    {
      id: "davinci-virtual",
      name: "Davinci Virtual Offices",
      fullName: "Davinci Virtual Offices Orlando",
      image: officeImage2,
      rating: 4.3,
      reviewCount: 203,
      orlandoLocations: 3,
      totalLocations: 2000,
      priceRange: "$79 - $379/month",
      basicPrice: 79,
      premiumPrice: 179,
      executivePrice: 379,
      services: ["Virtual Office", "Live Receptionist", "Mail Services", "Day Offices"],
      description: "Davinci Virtual Offices delivers premium virtual office services with live receptionists and flexible workspace solutions. Their Orlando locations provide prestigious addresses in prime business districts.",
      keyLocations: ["Downtown Orlando", "Lake Nona", "International Drive"],
      founded: 2006,
      globalPresence: "1000+ locations worldwide",
      specialties: ["Live Receptionists", "Premium Locations", "Flexible Terms"],
      isPopular: true,
      affiliateUrl: "https://example.com/davinci-virtual-orlando",
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
        virtualReceptionist: true
      }
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

  const totalOrlandoLocations = providers.reduce((sum, provider) => sum + provider.orlandoLocations, 0);

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="providers-hero-title">
                Orlando Virtual Office Providers
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="providers-hero-description">
                Compare Orlando's top virtual office providers. Find the perfect match for your business needs with 
                detailed overviews, pricing comparisons, and location coverage across Central Florida.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-center">
                <div className="bg-card p-4 rounded-lg border" data-testid="stats-providers">
                  <div className="text-2xl font-bold text-primary">{providers.length}</div>
                  <div className="text-sm text-muted-foreground">Providers</div>
                </div>
                <div className="bg-card p-4 rounded-lg border" data-testid="stats-locations">
                  <div className="text-2xl font-bold text-primary">{totalOrlandoLocations}</div>
                  <div className="text-sm text-muted-foreground">Orlando Locations</div>
                </div>
                <div className="bg-card p-4 rounded-lg border" data-testid="stats-districts">
                  <div className="text-2xl font-bold text-primary">8+</div>
                  <div className="text-sm text-muted-foreground">Business Districts</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8" data-testid="providers-tabs">
                <TabsTrigger value="overview" data-testid="tab-overview">Provider Overview</TabsTrigger>
                <TabsTrigger value="comparison" data-testid="tab-comparison">Pricing Comparison</TabsTrigger>
                <TabsTrigger value="locations" data-testid="tab-locations">Location Coverage</TabsTrigger>
              </TabsList>

              {/* Provider Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-8">
                  {providers.map((provider, index) => (
                    <Card key={provider.id} className="hover-elevate" data-testid={`provider-overview-${provider.id}`}>
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Provider Image */}
                          <div className="relative">
                            <Image
                              src={provider.image}
                              alt={`${provider.name} office space`}
                              className="w-full h-48 object-cover rounded-lg"
                              width={400}
                              height={192}
                            />
                            {provider.isPopular && (
                              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground" data-testid={`provider-popular-${provider.id}`}>
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>

                          {/* Provider Info */}
                          <div className="md:col-span-2 space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold text-foreground" data-testid={`provider-name-${provider.id}`}>
                                  {provider.name}
                                </h2>
                                <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium" data-testid={`provider-rating-${provider.id}`}>
                                    {provider.rating} ({provider.reviewCount} reviews)
                                  </span>
                                </div>
                              </div>
                              <p className="text-muted-foreground text-sm mb-4">
                                Founded {provider.founded} • {provider.globalPresence} • {provider.totalLocations}+ locations globally
                              </p>
                            </div>

                            <p className="text-foreground leading-relaxed" data-testid={`provider-description-${provider.id}`}>
                              {provider.description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                  <MapPin className="w-4 h-4 text-primary mr-1" />
                                  <span className="text-lg font-bold text-primary" data-testid={`provider-orlando-locations-${provider.id}`}>
                                    {provider.orlandoLocations}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">Orlando Locations</div>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                  <Building className="w-4 h-4 text-primary mr-1" />
                                  <span className="text-lg font-bold text-primary">
                                    {provider.services.length}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">Services</div>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                  <Users className="w-4 h-4 text-primary mr-1" />
                                  <span className="text-lg font-bold text-primary">
                                    ${provider.basicPrice}+
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">Starting Price</div>
                              </div>
                            </div>

                            {/* Services & Specialties */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Services</h4>
                                <div className="flex flex-wrap gap-1">
                                  {provider.services.map((service, serviceIndex) => (
                                    <Badge key={serviceIndex} variant="secondary" className="text-xs" data-testid={`provider-service-${serviceIndex}-${provider.id}`}>
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Specialties</h4>
                                <div className="flex flex-wrap gap-1">
                                  {provider.specialties.map((specialty, specialtyIndex) => (
                                    <Badge key={specialtyIndex} variant="outline" className="text-xs" data-testid={`provider-specialty-${specialtyIndex}-${provider.id}`}>
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="flex gap-3 pt-2">
                              <Button asChild className="flex-1" data-testid={`provider-cta-${provider.id}`}>
                                <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Plans & Sign Up
                                </a>
                              </Button>
                              <Button variant="outline" data-testid={`provider-details-${provider.id}`}>
                                More Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Pricing Comparison Tab */}
              <TabsContent value="comparison">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="comparison-title">
                      Pricing & Features Comparison
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="comparison-description">
                      Compare pricing tiers and features across all Orlando virtual office providers to find the best fit for your business.
                    </p>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="lg:hidden space-y-6">
                    {providers.map((provider, index) => (
                      <Card key={provider.id} className="hover-elevate" data-testid={`mobile-comparison-card-${provider.id}`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{provider.name}</CardTitle>
                            {provider.isPopular && (
                              <Badge variant="default" className="bg-primary" data-testid={`mobile-popular-${provider.id}`}>
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{provider.orlandoLocations} Orlando locations</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {provider.rating} ({provider.reviewCount} reviews)
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Basic</div>
                              <div className="text-lg font-bold">${provider.basicPrice}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Premium</div>
                              <div className="text-lg font-bold">${provider.premiumPrice}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Executive</div>
                              <div className="text-lg font-bold">${provider.executivePrice}</div>
                            </div>
                          </div>
                          <Button asChild className="w-full" data-testid={`mobile-comparison-cta-${provider.id}`}>
                            <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Plans & Sign Up
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden lg:block overflow-x-auto">
                    <div className="min-w-full">
                      {/* Provider Headers */}
                      <div className="grid grid-cols-5 gap-4 mb-6">
                        <div></div>
                        {providers.map((provider) => (
                          <Card key={provider.id} className="hover-elevate" data-testid={`desktop-comparison-header-${provider.id}`}>
                            <CardHeader className="text-center p-4">
                              <div className="flex items-center justify-center mb-2">
                                <CardTitle className="text-lg">{provider.name}</CardTitle>
                                {provider.isPopular && (
                                  <Badge variant="default" className="ml-2 bg-primary" data-testid={`desktop-popular-${provider.id}`}>
                                    <Star className="w-3 h-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground mb-3">{provider.orlandoLocations} Orlando locations</div>
                              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                                <Star className="w-3 h-3 fill-current" />
                                {provider.rating} ({provider.reviewCount})
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>

                      {/* Pricing Tiers */}
                      <div className="space-y-4 mb-8">
                        {["Basic", "Premium", "Executive"].map((tier, tierIndex) => (
                          <div key={tier} className="grid grid-cols-5 gap-4 items-center py-4 border-b border-border" data-testid={`desktop-pricing-tier-${tier.toLowerCase()}`}>
                            <div className="font-semibold text-foreground">{tier} Plan</div>
                            {providers.map((provider) => (
                              <div key={provider.id} className="text-center" data-testid={`desktop-price-${tier.toLowerCase()}-${provider.id}`}>
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

                      {/* Features Comparison */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Features Comparison</h3>
                        <div className="space-y-3">
                          {Object.entries(featureLabels).map(([featureKey, featureLabel]) => (
                            <div key={featureKey} className="grid grid-cols-5 gap-4 items-center py-2 hover:bg-muted/50 rounded-lg px-2" data-testid={`desktop-feature-${featureKey}`}>
                              <div className="text-sm text-foreground">{featureLabel}</div>
                              {providers.map((provider) => (
                                <div key={provider.id} className="text-center" data-testid={`desktop-feature-${featureKey}-${provider.id}`}>
                                  {provider.features[featureKey as keyof typeof provider.features] ? (
                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                  ) : (
                                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-5 gap-4 mt-8">
                        <div></div>
                        {providers.map((provider) => (
                          <Button key={provider.id} asChild className="w-full" data-testid={`desktop-comparison-cta-${provider.id}`}>
                            <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Sign Up
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Location Coverage Tab */}
              <TabsContent value="locations">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="locations-title">
                      Orlando Location Coverage
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="locations-description">
                      See which Orlando business districts each provider covers and find the perfect location for your virtual office.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {providers.map((provider) => (
                      <Card key={provider.id} className="hover-elevate" data-testid={`location-coverage-${provider.id}`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{provider.name}</CardTitle>
                            <Badge variant="outline" data-testid={`location-count-${provider.id}`}>
                              {provider.orlandoLocations} Orlando Locations
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-foreground mb-3">Key Orlando Locations</h4>
                              <div className="space-y-2">
                                {provider.keyLocations.map((location, locationIndex) => (
                                  <div key={locationIndex} className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span data-testid={`location-${locationIndex}-${provider.id}`}>{location}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-3">Quick Info</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Price Range:</span>
                                  <span className="font-medium" data-testid={`location-price-${provider.id}`}>{provider.priceRange}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Rating:</span>
                                  <span className="flex items-center gap-1 font-medium">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    {provider.rating}/5
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Founded:</span>
                                  <span className="font-medium">{provider.founded}</span>
                                </div>
                              </div>
                              <Button asChild className="w-full mt-4" data-testid={`location-cta-${provider.id}`}>
                                <a href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Locations & Sign Up
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}