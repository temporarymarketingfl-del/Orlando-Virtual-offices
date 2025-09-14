import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularProviders from "@/components/PopularProviders";
import FeaturedLocations from "@/components/FeaturedLocations";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PopularProviders />
        <FeaturedLocations />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}