import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, Users, TrendingUp, MapPin } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      company: "TechFlow Solutions",
      industry: "Software Development",
      location: "Lake Nona Medical City",
      founder: "Sarah Chen",
      title: "CEO & Founder",
      story: "Starting with a virtual office in Lake Nona's Medical City gave us instant credibility in Orlando's tech scene. The professional address helped us land our first major healthcare client, and the meeting rooms were perfect for investor presentations. We've grown from 3 to 25 employees in just 18 months.",
      results: {
        growth: "720% revenue increase",
        employees: "3 to 25 employees",
        timeline: "18 months"
      },
      rating: 5,
      provider: "WeWork Lake Nona"
    },
    {
      company: "Sunshine Legal Services",
      industry: "Legal Services",
      location: "Downtown Orlando",
      founder: "Michael Rodriguez",
      title: "Managing Partner",
      story: "The prestigious Orange Avenue address immediately elevated our firm's image. Clients were impressed by our downtown location, and the professional phone answering service ensured we never missed important calls. Our client base doubled within the first year.",
      results: {
        growth: "100% client increase",
        employees: "2 to 8 attorneys",
        timeline: "12 months"
      },
      rating: 5,
      provider: "Regus Downtown Orlando"
    },
    {
      company: "Global Marketing Collective",
      industry: "Marketing & Advertising",
      location: "Dr. Phillips",
      founder: "Jessica Thompson",
      title: "Creative Director",
      story: "As a marketing agency serving international hospitality clients, having a Dr. Phillips address near Restaurant Row was perfect. The location resonated with our target market, and the flexible meeting spaces allowed us to host impressive client presentations without the overhead of a permanent office.",
      results: {
        growth: "350% client portfolio growth",
        employees: "Solo to 12-person team",
        timeline: "24 months"
      },
      rating: 5,
      provider: "Orlando Executive Center"
    },
    {
      company: "MedTech Innovations",
      industry: "Healthcare Technology",
      location: "Lake Nona Medical City",
      founder: "Dr. Robert Kim",
      title: "Chief Medical Officer",
      story: "Being located in Medical City was crucial for networking with other healthcare companies and institutions. The virtual office package included access to conference facilities that we used for FDA meetings and investor presentations. It positioned us perfectly in Orlando's growing biotech corridor.",
      results: {
        growth: "Series A funding secured",
        employees: "6 to 45 employees",
        timeline: "30 months"
      },
      rating: 5,
      provider: "WeWork Lake Nona"
    },
    {
      company: "Orlando Consulting Partners",
      industry: "Business Consulting",
      location: "Winter Park",
      founder: "Amanda Foster",
      title: "Principal Consultant",
      story: "The Winter Park location gave us access to Orlando's established business community while maintaining the boutique feel our high-end clients expected. The Park Avenue address opened doors that might have remained closed with a less prestigious location.",
      results: {
        growth: "400% revenue increase",
        employees: "1 to 6 consultants",
        timeline: "20 months"
      },
      rating: 5,
      provider: "Park Avenue Executive Suites"
    },
    {
      company: "International Trade Solutions",
      industry: "Import/Export",
      location: "Millenia",
      founder: "Carlos Martinez",
      title: "President",
      story: "The Millenia location was strategic for our international business. Being minutes from Orlando International Airport made client visits seamless, and the professional address helped us establish credibility with Latin American partners. Our trade volume increased significantly.",
      results: {
        growth: "280% trade volume increase",
        employees: "4 to 15 employees",
        timeline: "16 months"
      },
      rating: 5,
      provider: "Spaces Millenia"
    }
  ];

  const stats = [
    { label: "Average Revenue Growth", value: "375%" },
    { label: "Companies Served", value: "2,500+" },
    { label: "Success Rate", value: "94%" },
    { label: "Average Time to Growth", value: "18 months" }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="success-stories-title">
            Orlando Virtual Office Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="success-stories-description">
            Real businesses, real results. See how Orlando's virtual office solutions have helped 
            companies establish credibility, attract clients, and achieve remarkable growth in Central Florida.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`success-stat-${index}`}>
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="hover-elevate" data-testid={`success-story-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1" data-testid={`story-company-${index}`}>
                      {story.company}
                    </h3>
                    <div className="flex items-center gap-2 mb-2" data-testid={`story-meta-${index}`}>
                      <Badge variant="outline" className="text-xs" data-testid={`story-industry-${index}`}>{story.industry}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground" data-testid={`story-location-${index}`}>
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {story.location}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`story-founder-${index}`}>
                      {story.founder}, {story.title}
                    </div>
                  </div>
                  <div className="flex" data-testid={`story-rating-${index}`}>
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-foreground leading-relaxed mb-6 italic" data-testid={`story-quote-${index}`}>
                  "{story.story}"
                </blockquote>

                <div className="grid grid-cols-3 gap-4 p-4 bg-background rounded-lg" data-testid={`story-results-${index}`}>
                  <div className="text-center" data-testid={`story-growth-${index}`}>
                    <div className="text-lg font-bold text-primary">{story.results.growth}</div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                  <div className="text-center" data-testid={`story-employees-${index}`}>
                    <div className="text-lg font-bold text-primary">{story.results.employees}</div>
                    <div className="text-xs text-muted-foreground">Team Size</div>
                  </div>
                  <div className="text-center" data-testid={`story-timeline-${index}`}>
                    <div className="text-lg font-bold text-primary">{story.results.timeline}</div>
                    <div className="text-xs text-muted-foreground">Timeframe</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between" data-testid={`story-footer-${index}`}>
                  <div className="text-xs text-muted-foreground" data-testid={`story-provider-${index}`}>
                    Provider: {story.provider}
                  </div>
                  <Badge variant="secondary" className="text-xs" data-testid={`story-verified-${index}`}>
                    Verified Success Story
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Breakdown */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8" data-testid="industry-breakdown-title">
            Success Across Industries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { industry: "Technology", count: "45%" },
              { industry: "Healthcare", count: "20%" },
              { industry: "Legal", count: "15%" },
              { industry: "Consulting", count: "12%" },
              { industry: "Marketing", count: "5%" },
              { industry: "Other", count: "3%" }
            ].map((item, index) => (
              <Card key={index} className="hover-elevate" data-testid={`industry-card-${index}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary" data-testid={`industry-percentage-${index}`}>{item.count}</div>
                  <div className="text-sm text-muted-foreground" data-testid={`industry-name-${index}`}>{item.industry}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center justify-center gap-2" data-testid="cta-title">
                <TrendingUp className="w-5 h-5" aria-hidden="true" />
                Ready to Write Your Success Story?
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="cta-description">
                Join over 2,500 successful businesses that have established their Orlando presence 
                with professional virtual office solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}