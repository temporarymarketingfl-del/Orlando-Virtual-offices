import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Building, Users, TrendingUp, Check, X, ExternalLink, Phone, Mail, Globe } from "lucide-react"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { getProviderById, featureLabels } from "@/data/providers"

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const provider = getProviderById(params.id)
  
  if (!provider) {
    return {
      title: "Provider Not Found - Orlando Virtual Offices",
      description: "The requested provider could not be found."
    }
  }

  return {
    title: `${provider.name} - Orlando Virtual Office Provider`,
    description: `${provider.description} Starting at $${provider.basicPrice}/month. ${provider.orlandoLocations} Orlando locations. ${provider.rating} stars from ${provider.reviewCount} reviews.`,
    keywords: `${provider.name}, Orlando virtual office, virtual office ${provider.keyLocations.join(', ')}, business address Orlando`,
    alternates: {
      canonical: `https://orlandovirtualoffices.com/providers/${provider.id}`
    },
    openGraph: {
      title: `${provider.name} - Orlando Virtual Office Provider`,
      description: `${provider.description} Starting at $${provider.basicPrice}/month in Orlando.`,
      url: `https://orlandovirtualoffices.com/providers/${provider.id}`,
      siteName: "Orlando Virtual Offices",
      type: "website",
    },
  }
}

export default function ProviderDetailPage({ params }: PageProps) {
  const provider = getProviderById(params.id)
  
  if (!provider) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="provider-name">
                    {provider.name}
                  </h1>
                  {provider.isPopular && (
                    <Badge className="bg-primary text-primary-foreground" data-testid="popular-badge">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-muted-foreground mb-6" data-testid="provider-description">
                  {provider.description}
                </p>
                
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary" data-testid="rating">
                      {provider.rating}
                    </div>
                    <div className="text-sm text-muted-foreground">Rating ({provider.reviewCount} reviews)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary" data-testid="orlando-locations">
                      {provider.orlandoLocations}
                    </div>
                    <div className="text-sm text-muted-foreground">Orlando Locations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary" data-testid="starting-price">
                      ${provider.basicPrice}+
                    </div>
                    <div className="text-sm text-muted-foreground">Starting Price</div>
                  </div>
                </div>

                <Button size="lg" className="w-full md:w-auto" asChild data-testid="main-cta">
                  <Link href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Started with {provider.name}
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <Image
                  src={provider.image}
                  alt={`${provider.name} office space`}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                  width={600}
                  height={320}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Provider Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="benefits-title">
              Why Choose {provider.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {provider.benefits?.map((benefit, index) => (
                <Card key={index} className="hover-elevate" data-testid={`benefit-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              )) || []}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="pricing-title">
              Pricing Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Basic", price: provider.basicPrice, popular: false },
                { name: "Premium", price: provider.premiumPrice, popular: true },
                { name: "Executive", price: provider.executivePrice, popular: false }
              ].map((plan, index) => (
                <Card key={index} className={`hover-elevate ${plan.popular ? 'border-primary' : ''}`} data-testid={`pricing-plan-${plan.name.toLowerCase()}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.popular && (
                        <Badge className="bg-primary" data-testid="popular-plan">Most Popular</Badge>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      ${plan.price}<span className="text-sm text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild data-testid={`select-plan-${plan.name.toLowerCase()}`}>
                      <Link href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                        Select {plan.name} Plan
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features & Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="features-title">
              Features & Services
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Features List */}
              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle>Included Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(featureLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between" data-testid={`feature-${key}`}>
                        <span className="text-foreground">{label}</span>
                        {provider.features[key as keyof typeof provider.features] ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle>Core Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {provider.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3" data-testid={`service-${index}`}>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" data-testid={`specialty-${index}`}>
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Orlando Locations */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="locations-title">
              {provider.name} Orlando Locations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {provider.keyLocations.map((location, index) => (
                <Card key={index} className="hover-elevate" data-testid={`location-${index}`}>
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground">{location}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Premium business address available
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Total of {provider.orlandoLocations} locations across Orlando's premier business districts
              </p>
              <Button variant="outline" asChild data-testid="view-all-locations">
                <Link href="/locations">
                  View All {provider.name} Locations
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact & CTA */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="contact-title">
                  Ready to Get Started with {provider.name}?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses who trust {provider.name} for their virtual office needs in Orlando. 
                  Get started today and establish your professional presence.
                </p>
                
                {provider.contactInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-background hover-elevate" data-testid="contact-phone">
                      <CardContent className="p-4 text-center">
                        <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground">Call Us</div>
                        <div className="text-sm text-muted-foreground">{provider.contactInfo.phone}</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-background hover-elevate" data-testid="contact-email">
                      <CardContent className="p-4 text-center">
                        <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground">Email Us</div>
                        <div className="text-sm text-muted-foreground">{provider.contactInfo.email}</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-background hover-elevate" data-testid="contact-website">
                      <CardContent className="p-4 text-center">
                        <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground">Visit Website</div>
                        <div className="text-sm text-muted-foreground">{provider.contactInfo.website}</div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Button size="lg" className="mx-auto" asChild data-testid="final-cta">
                  <Link href={provider.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Start Your Virtual Office Today
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}