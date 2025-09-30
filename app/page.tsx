import { Metadata } from "next"
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion"
import OrlandoBusinessAdvantages from "@/components/OrlandoBusinessAdvantages"
import AnimatedProviderShowcase from "@/components/AnimatedProviderShowcase"
import NeighborhoodDeepDive from "@/components/NeighborhoodDeepDive"
import SuccessStories from "@/components/SuccessStories"
import NewsletterSignup from "@/components/NewsletterSignup"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Orlando Virtual Offices - Find Your Perfect Virtual Office Provider",
  description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions, business addresses, and professional services in Central Florida's prime business districts.",
  keywords: "virtual office Orlando, business address Orlando, virtual office providers, Orlando workspace, Central Florida virtual offices",
  alternates: {
    canonical: "https://orlandovirtualoffices.com"
  },
  openGraph: {
    title: "Orlando Virtual Offices - Find Your Perfect Virtual Office Provider",
    description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions in Central Florida.",
    url: "https://orlandovirtualoffices.com",
    siteName: "Orlando Virtual Offices",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <LandingAccordionItem />
        <OrlandoBusinessAdvantages />
        <AnimatedProviderShowcase />
        <NeighborhoodDeepDive />
        <SuccessStories />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}