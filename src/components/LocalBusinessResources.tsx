import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Users, Building, Gavel, TrendingUp, Globe, Phone } from "lucide-react";

export default function LocalBusinessResources() {
  const resources = [
    {
      category: "Business Registration",
      icon: FileText,
      description: "Essential resources for registering your business in Orlando and Orange County",
      resources: [
        {
          name: "Florida Division of Corporations",
          description: "Register your LLC or Corporation online",
          url: "https://dos.fl.gov/sunbiz/",
          type: "Government"
        },
        {
          name: "Orange County Business Licenses",
          description: "Apply for local business licenses and permits",
          url: "https://www.orangecountyfl.net/BusinessTaxReceipts/",
          type: "Government"
        },
        {
          name: "City of Orlando Business Development",
          description: "Local business support and incentives",
          url: "https://www.orlando.gov/Our-Government/Departments-Offices/Families-Parks-Recreation/Economic-Development",
          type: "Government"
        }
      ]
    },
    {
      category: "Networking & Chambers",
      icon: Users,
      description: "Connect with Orlando's vibrant business community",
      resources: [
        {
          name: "Orlando Regional Chamber",
          description: "Premier business organization with 2,000+ members",
          url: "https://www.orlando.org/",
          type: "Chamber"
        },
        {
          name: "Orlando Economic Partnership",
          description: "Economic development and business attraction",
          url: "https://www.orlandomakesithappen.com/",
          type: "Economic Development"
        },
        {
          name: "Central Florida Tech Alliance",
          description: "Technology industry networking and advocacy",
          url: "https://www.techalliancefl.org/",
          type: "Industry Group"
        }
      ]
    },
    {
      category: "Legal & Professional Services",
      icon: Gavel,
      description: "Professional services specifically serving Orlando businesses",
      resources: [
        {
          name: "Orange County Bar Association",
          description: "Directory of local business attorneys",
          url: "https://www.orangecountybar.org/",
          type: "Professional"
        },
        {
          name: "Florida Institute of CPAs",
          description: "Certified accountants in Central Florida",
          url: "https://www.ficpa.org/",
          type: "Professional"
        },
        {
          name: "Orlando Business Journal",
          description: "Local business news and directory",
          url: "https://www.bizjournals.com/orlando/",
          type: "Media"
        }
      ]
    },
    {
      category: "Banking & Finance",
      icon: Building,
      description: "Financial institutions with strong Orlando presence",
      resources: [
        {
          name: "CenterState Bank (Now Synovus)",
          description: "Local commercial banking with SBA lending",
          url: "https://www.synovus.com/",
          type: "Banking"
        },
        {
          name: "Orlando Federal Credit Union",
          description: "Business accounts and lending for Central Florida",
          url: "https://www.orlandofcu.com/",
          type: "Credit Union"
        },
        {
          name: "Florida SBDC at UCF",
          description: "Small business development and consulting",
          url: "https://www.sbdcorlando.com/",
          type: "Consulting"
        }
      ]
    },
    {
      category: "Market Research",
      icon: TrendingUp,
      description: "Orlando market data and business intelligence",
      resources: [
        {
          name: "Orlando Economic Development Commission",
          description: "Market studies and demographic data",
          url: "https://www.orlandomakesithappen.com/",
          type: "Research"
        },
        {
          name: "Orange County Property Appraiser",
          description: "Commercial real estate market data",
          url: "https://www.ocpafl.org/",
          type: "Real Estate"
        },
        {
          name: "Visit Orlando Business Events",
          description: "Tourism and convention industry insights",
          url: "https://www.visitorlando.com/",
          type: "Tourism"
        }
      ]
    },
    {
      category: "International Trade",
      icon: Globe,
      description: "Resources for global business expansion",
      resources: [
        {
          name: "Enterprise Florida",
          description: "International trade development programs",
          url: "https://www.enterpriseflorida.com/",
          type: "Trade"
        },
        {
          name: "Orlando International Airport Business",
          description: "Global connectivity and cargo services",
          url: "https://www.orlandoairports.net/",
          type: "Logistics"
        },
        {
          name: "World Trade Center Orlando",
          description: "International business facilitation",
          url: "https://www.wtcorlando.org/",
          type: "Trade"
        }
      ]
    }
  ];

  const quickContacts = [
    {
      name: "Orlando City Hall",
      phone: "(407) 246-2121",
      service: "Business Licenses & Permits"
    },
    {
      name: "Orange County Government",
      phone: "(407) 836-7370",
      service: "County Business Services"
    },
    {
      name: "Florida Department of Revenue",
      phone: "(850) 488-6800",
      service: "Tax Registration & Filing"
    },
    {
      name: "IRS Business Line",
      phone: "(800) 829-4933",
      service: "Federal Tax ID & Requirements"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="local-resources-title">
            Orlando Business Resources & Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="local-resources-description">
            Navigate Orlando's business landscape with confidence. 
            Essential resources, contacts, and services for establishing and growing your business in Central Florida.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {resources.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`resource-category-${index}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3" data-testid={`resource-category-title-${index}`}>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    {category.category}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-muted/50" data-testid={`resource-item-${index}-${resourceIndex}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground text-sm" data-testid={`resource-name-${index}-${resourceIndex}`}>{resource.name}</h4>
                            <Badge variant="outline" className="text-xs" data-testid={`resource-type-${index}-${resourceIndex}`}>{resource.type}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground" data-testid={`resource-description-${index}-${resourceIndex}`}>{resource.description}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="flex-shrink-0" 
                          data-testid={`resource-link-${index}-${resourceIndex}`}
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Contacts */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3" data-testid="quick-contacts-title">
              <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
              Essential Orlando Business Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg" data-testid={`quick-contact-${index}`}>
                  <div>
                    <div className="font-medium text-foreground text-sm">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">{contact.service}</div>
                  </div>
                  <div className="text-sm font-mono text-primary">{contact.phone}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Local Business Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-elevate" data-testid="florida-advantages-card">
            <CardHeader>
              <CardTitle className="text-lg" data-testid="florida-advantages-title">Florida Business Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2" data-testid="florida-advantages-list">
                <li>• No state personal income tax</li>
                <li>• No state corporate income tax on limited partnerships</li>
                <li>• Business-friendly regulatory environment</li>
                <li>• Strategic location for Latin America trade</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="orlando-strengths-card">
            <CardHeader>
              <CardTitle className="text-lg" data-testid="orlando-strengths-title">Orlando Industry Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2" data-testid="orlando-strengths-list">
                <li>• Tourism & Hospitality (Walt Disney World, Universal)</li>
                <li>• Healthcare & Life Sciences (Medical City)</li>
                <li>• Technology & Gaming</li>
                <li>• Aerospace & Defense</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="getting-started-card">
            <CardHeader>
              <CardTitle className="text-lg" data-testid="getting-started-title">Getting Started Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2" data-testid="getting-started-checklist">
                <li>• Register business entity with Florida</li>
                <li>• Obtain Federal EIN number</li>
                <li>• Apply for local business license</li>
                <li>• Set up Florida sales tax account</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-3" data-testid="setup-assistance-title">
                Need Personalized Business Setup Assistance?
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="setup-assistance-description">
                Our Orlando business specialists can guide you through the setup process 
                and connect you with the right local resources for your specific needs.
              </p>
              <Button data-testid="setup-assistance-button">
                Get Setup Assistance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}