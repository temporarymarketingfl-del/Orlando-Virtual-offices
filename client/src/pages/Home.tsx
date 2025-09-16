import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OrlandoBusinessAdvantages from "@/components/OrlandoBusinessAdvantages";
import PopularProviders from "@/components/PopularProviders";
import NeighborhoodDeepDive from "@/components/NeighborhoodDeepDive";
import FeaturedLocations from "@/components/FeaturedLocations";
import PricingComparisonTable from "@/components/PricingComparisonTable";
import LocalBusinessResources from "@/components/LocalBusinessResources";
import SuccessStories from "@/components/SuccessStories";
import OrlandoVirtualOfficeFAQ from "@/components/OrlandoVirtualOfficeFAQ";
import OrlandoMarketInsights from "@/components/OrlandoMarketInsights";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
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
  );
}