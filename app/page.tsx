import { Metadata } from "next"
import { HeroSection } from "@/components/ui/hero-section-6"
import OrlandoBusinessAdvantages from "@/components/OrlandoBusinessAdvantages"
import PopularProviders from "@/components/PopularProviders"
import NeighborhoodDeepDive from "@/components/NeighborhoodDeepDive"
import FeaturedLocations from "@/components/FeaturedLocations"
import PricingComparisonTable from "@/components/PricingComparisonTable"
import LocalBusinessResources from "@/components/LocalBusinessResources"
import SuccessStories from "@/components/SuccessStories"
import OrlandoVirtualOfficeFAQ from "@/components/OrlandoVirtualOfficeFAQ"
import OrlandoMarketInsights from "@/components/OrlandoMarketInsights"
import NewsletterSignup from "@/components/NewsletterSignup"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "VirtualOffice Hub - Orlando Virtual Office Providers",
  description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions, business addresses, and professional services in Central Florida's prime business districts.",
  keywords: "virtual office Orlando, business address Orlando, virtual office providers, Orlando workspace, Central Florida virtual offices",
  alternates: {
    canonical: "https://virtualoffice-hub.com"
  },
  openGraph: {
    title: "VirtualOffice Hub - Orlando Virtual Office Providers",
    description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions in Central Florida.",
    url: "https://virtualoffice-hub.com",
    siteName: "VirtualOffice Hub",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <OrlandoBusinessAdvantages />
        <PopularProviders />
        <NeighborhoodDeepDive />
        <FeaturedLocations />
        <PricingComparisonTable />
        <LocalBusinessResources />
        <SuccessStories />
        <OrlandoVirtualOfficeFAQ />
        <OrlandoMarketInsights />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}