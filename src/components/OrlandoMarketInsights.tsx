import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Building, Users, DollarSign, Plane, MapPin, Briefcase } from "lucide-react";

export default function OrlandoMarketInsights() {
  const marketData = [
    {
      title: "Economic Growth",
      icon: TrendingUp,
      value: "4.2%",
      change: "+0.8%",
      trend: "up",
      description: "Annual GDP growth rate outpacing national average",
      timeframe: "2024 YTD"
    },
    {
      title: "Business Formation",
      icon: Building,
      value: "12,400+",
      change: "+15%",
      trend: "up",
      description: "New businesses registered in Orange County",
      timeframe: "Past 12 months"
    },
    {
      title: "Population Growth",
      icon: Users,
      value: "2.8%",
      change: "+0.4%",
      trend: "up",
      description: "Metro Orlando population increase",
      timeframe: "Annual growth"
    },
    {
      title: "Unemployment Rate",
      icon: Briefcase,
      value: "2.9%",
      change: "-0.3%",
      trend: "up",
      description: "Below national average, indicating strong job market",
      timeframe: "Current rate"
    },
    {
      title: "Commercial Real Estate",
      icon: DollarSign,
      value: "$28/sq ft",
      change: "+12%",
      trend: "up",
      description: "Average Class A office rent",
      timeframe: "Q3 2024"
    },
    {
      title: "Airport Traffic",
      icon: Plane,
      value: "58M+",
      change: "+8%",
      trend: "up",
      description: "Annual passengers through Orlando International",
      timeframe: "2024 projected"
    }
  ];

  const industryGrowth = [
    {
      industry: "Technology & Software",
      growth: "+18.5%",
      jobs: "45,000+",
      highlight: "Lake Nona tech corridor expansion"
    },
    {
      industry: "Healthcare & Life Sciences",
      growth: "+12.3%",
      jobs: "120,000+",
      highlight: "Medical City continuing development"
    },
    {
      industry: "Tourism & Hospitality",
      growth: "+8.7%",
      jobs: "450,000+",
      highlight: "Post-pandemic recovery accelerating"
    },
    {
      industry: "Aerospace & Defense",
      growth: "+6.2%",
      jobs: "35,000+",
      highlight: "Government contracts increasing"
    },
    {
      industry: "Financial Services",
      growth: "+9.4%",
      jobs: "65,000+",
      highlight: "Downtown Orlando expansion"
    },
    {
      industry: "International Trade",
      growth: "+14.1%",
      jobs: "28,000+",
      highlight: "Latin America gateway growth"
    }
  ];

  const businessDistricts = [
    {
      district: "Lake Nona Medical City",
      growth: "Fastest Growing",
      newBusinesses: "850+ new companies",
      keyDevelopment: "$8B investment in innovation district",
      trend: "up"
    },
    {
      district: "Downtown Orlando",
      growth: "Steady Expansion",
      newBusinesses: "425+ new companies",
      keyDevelopment: "Creative Village phase 2 completion",
      trend: "up"
    },
    {
      district: "Dr. Phillips",
      growth: "Premium Market",
      newBusinesses: "320+ new companies",
      keyDevelopment: "Restaurant Row expansion continuing",
      trend: "up"
    },
    {
      district: "Millenia",
      growth: "International Focus",
      newBusinesses: "280+ new companies",
      keyDevelopment: "New luxury hotel and convention space",
      trend: "up"
    }
  ];

  const marketForecasts = [
    {
      metric: "Virtual Office Demand",
      forecast: "+25% by 2025",
      driver: "Hybrid work adoption and business relocations"
    },
    {
      metric: "Commercial Space Costs",
      forecast: "+8-12% annually",
      driver: "Limited supply and growing demand"
    },
    {
      metric: "Business Registration",
      forecast: "+10,000 annually",
      driver: "Florida's business-friendly policies"
    },
    {
      metric: "Tech Sector Growth",
      forecast: "+20% workforce",
      driver: "Major corporate relocations to Lake Nona"
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="market-insights-title">
            Orlando Business Market Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="market-insights-description">
            Stay informed with the latest Orlando market data, economic trends, and business growth indicators. 
            Make data-driven decisions for your virtual office location and business expansion.
          </p>
        </div>

        {/* Key Market Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-16">
          {marketData.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`market-metric-${index}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-5 h-5 text-primary" />
                    <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                      {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.title}</div>
                  <div className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change} {metric.timeframe}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Industry Growth */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Industry Growth by Sector
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryGrowth.map((industry, index) => (
              <Card key={index} className="hover-elevate" data-testid={`industry-growth-${index}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{industry.industry}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Growth Rate</span>
                    <span className="text-lg font-bold text-green-600">{industry.growth}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Total Jobs</span>
                    <span className="text-lg font-bold text-foreground">{industry.jobs}</span>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                    <span className="font-medium">Highlight:</span> {industry.highlight}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Districts Performance */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Business District Performance
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {businessDistricts.map((district, index) => (
              <Card key={index} className="hover-elevate" data-testid={`district-performance-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-foreground">{district.district}</h4>
                    <Badge variant="default" className="bg-primary">
                      {district.growth}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{district.newBusinesses}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-sm text-muted-foreground">{district.keyDevelopment}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Forecasts */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            2025 Market Forecasts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketForecasts.map((forecast, index) => (
              <Card key={index} className="hover-elevate" data-testid={`market-forecast-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{forecast.metric}</h4>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {forecast.forecast}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Key Driver:</span> {forecast.driver}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Summary */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">
              Orlando Market Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Market Strengths</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rapid population and economic growth</li>
                  <li>• Diverse industry base reducing market risk</li>
                  <li>• Major infrastructure investments ongoing</li>
                  <li>• Business-friendly regulatory environment</li>
                  <li>• Strategic location for national and international business</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Virtual Office Market Outlook</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Increasing demand from remote and hybrid businesses</li>
                  <li>• Rising commercial real estate costs driving virtual adoption</li>
                  <li>• New developments creating premium address options</li>
                  <li>• Technology improvements enhancing service quality</li>
                  <li>• Growing acceptance by banks and business partners</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}