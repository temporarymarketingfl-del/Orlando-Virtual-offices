import { Metadata } from "next"
import LocalBusinessResources from "@/components/LocalBusinessResources"
import OrlandoVirtualOfficeFAQ from "@/components/OrlandoVirtualOfficeFAQ"
import OrlandoMarketInsights from "@/components/OrlandoMarketInsights"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "FAQ - Orlando Virtual Office Resources & Market Insights",
  description: "Comprehensive FAQ, business resources, and market insights for Orlando virtual offices. Get answers to common questions and access valuable business data for Central Florida.",
  keywords: "Orlando virtual office FAQ, business resources Orlando, market insights Central Florida, virtual office questions",
  alternates: {
    canonical: "https://orlandovirtualoffices.com/faq"
  },
  openGraph: {
    title: "FAQ - Orlando Virtual Office Resources & Market Insights",
    description: "Comprehensive FAQ, business resources, and market insights for Orlando virtual offices in Central Florida.",
    url: "https://orlandovirtualoffices.com/faq",
    siteName: "Orlando Virtual Offices",
    type: "website",
  },
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <OrlandoVirtualOfficeFAQ />
        <LocalBusinessResources />
        <OrlandoMarketInsights />
      </main>
      <Footer />
    </div>
  )
}