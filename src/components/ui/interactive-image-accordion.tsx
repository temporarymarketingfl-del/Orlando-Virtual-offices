'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ArrowLeft } from "lucide-react";

// --- Data for the virtual office providers accordion ---
interface ProviderItem {
  id: number;
  category: string;
  providerName: string;
  sellingPoint: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const accordionItems: ProviderItem[] = [
  {
    id: 1,
    category: 'All-Inclusive',
    providerName: 'Opus Virtual Offices',
    sellingPoint: 'Complete business solutions from $99/month',
    features: ['Professional phone answering', 'Mail handling & forwarding', 'Meeting room access'],
    ctaText: 'View Opus Locations',
    ctaLink: '/locations?provider=opus'
  },
  {
    id: 2,
    category: 'Cost Savvy',
    providerName: 'iPostal',
    sellingPoint: 'Affordable solutions starting at $29/month',
    features: ['Basic mail service', 'Digital mail scanning', 'Multiple Orlando locations'],
    ctaText: 'View iPostal Locations',
    ctaLink: '/locations?provider=ipostal'
  },
  {
    id: 3,
    category: 'Prestigious Address',
    providerName: 'Davinci Virtual',
    sellingPoint: 'Premium downtown addresses from $79/month',
    features: ['Prime business districts', 'Professional reception', 'Boardroom access'],
    ctaText: 'View Davinci Locations',
    ctaLink: '/locations?provider=davinci'
  },
  {
    id: 4,
    category: 'Prime Locations',
    providerName: 'Regus',
    sellingPoint: 'Global network with Orlando presence',
    features: ['Downtown Orlando towers', 'Worldwide access', '24/7 building access'],
    ctaText: 'View Regus Locations',
    ctaLink: '/locations?provider=regus'
  }
];

// --- Provider Data Interface for Carousel ---
interface Provider {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  description: string;
  excerpt: string;
  specialties: string[];
  featuredImage: string;
  logo: string;
  images: string[];
  priceRange: string;
  rating: number;
  reviewCount: number;
  orlandoLocations: number;
}

interface ApiResponse {
  success: boolean;
  data: Provider[];
  total: number;
}

// --- Hero Carousel Component ---
function HeroProviderCarousel() {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/providers', { featured: true, limit: 4 }],
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (error || !data?.data || data.data.length === 0) {
    return null;
  }

  // Diverse fallback images for providers
  const fallbackImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=3540&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3540&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=3540&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=3540&auto=format&fit=crop',
  ];

  // Transform provider data for the carousel
  const providerTestimonials = data.data.map((provider, index) => {
    const goodFor = provider.specialties && provider.specialties.length > 0
      ? `Best for ${provider.specialties.slice(0, 2).join(' and ').toLowerCase()}`
      : provider.excerpt || provider.description;

    const imageUrl = provider.featuredImage || 
                     (provider.images && provider.images.length > 0 ? provider.images[0] : '') ||
                     fallbackImages[index % fallbackImages.length];

    return {
      quote: goodFor,
      name: provider.displayName || provider.name,
      designation: `${provider.orlandoLocations || 'Multiple'} Orlando ${provider.orlandoLocations === 1 ? 'Location' : 'Locations'} • ${provider.priceRange || 'Contact for pricing'}`,
      src: imageUrl,
      slug: provider.slug,
      fullDescription: provider.excerpt || provider.description
    };
  });

  return <AnimatedTestimonialsWithCTA testimonials={providerTestimonials} autoplay={true} />;
}

// Extended version of AnimatedTestimonials with CTA button
function AnimatedTestimonialsWithCTA({ 
  testimonials, 
  autoplay = false 
}: { 
  testimonials: any[], 
  autoplay?: boolean 
}) {
  const [active, setActive] = React.useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  React.useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const currentProvider = testimonials[active];

  return (
    <div className="relative">
      <div className="relative h-[500px] md:h-[600px] w-full">
        {/* Image Stack */}
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.slug}-${index}`}
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotate: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index)
                  ? 999
                  : testimonials.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
            >
              <img
                src={testimonial.src}
                alt={testimonial.name}
                draggable={false}
                className="h-full w-full rounded-3xl object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Content Overlay - Inside the card */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 rounded-b-3xl backdrop-blur-md bg-black/30 z-[1000]">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentProvider.name}
            </h3>
            <p className="text-sm text-white/80 mb-3">
              {currentProvider.designation}
            </p>
            <p className="text-base md:text-lg text-white/90 mb-4">
              {currentProvider.quote}
            </p>
            <div className="flex items-center gap-4">
              <Link href={`/providers/${currentProvider.slug}`}>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white text-primary border-white hover:bg-white/90"
                  data-testid={`button-view-${currentProvider.slug}`}
                >
                  View Locations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              {/* Navigation buttons inline with CTA */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center group/button transition-colors"
                  data-testid="button-prev-hero-provider"
                >
                  <ArrowLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center group/button transition-colors"
                  data-testid="button-next-hero-provider"
                >
                  <ArrowRight className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: { 
  item: ProviderItem;
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <Card
      className={`
        relative cursor-pointer overflow-hidden
        transition-all duration-700 ease-in-out
        ${isActive 
          ? 'w-full md:w-[400px] h-auto md:h-[450px]' 
          : 'w-full md:w-[60px] h-auto md:h-[450px]'
        }
      `}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
      data-testid={`card-provider-${item.id}`}
    >
      {/* Inactive State: Category Label */}
      {!isActive && (
        <CardContent className="flex items-center justify-center py-1 px-0 md:p-0 h-full">
          <span
            className="text-muted-foreground text-lg font-semibold whitespace-nowrap transform md:rotate-90"
          >
            {item.category}
          </span>
        </CardContent>
      )}

      {/* Active State: Provider Card */}
      {isActive && (
        <CardContent className="p-6 flex flex-col justify-between hover-elevate h-full">
          {/* Provider Header */}
          <div className="text-center">
            {/* Provider Logo Placeholder */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {item.providerName.split(' ').map(word => word[0]).join('')}
            </div>
            
            {/* Provider Name */}
            <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`text-provider-${item.providerName.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.providerName}
            </h3>
            
            {/* Selling Point */}
            <p className="text-sm font-medium text-muted-foreground mb-4" data-testid={`text-selling-point-${item.id}`}>
              {item.sellingPoint}
            </p>
          </div>

          {/* Features List */}
          <div className="flex-1">
            <ul className="space-y-2">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-muted-foreground">
                  <span className="text-primary mr-2 mt-0.5">✓</span>
                  <span data-testid={`text-feature-${item.id}-${index}`}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            <Link href={item.ctaLink}>
              <Button
                className="w-full"
                data-testid={`button-cta-${item.providerName.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.ctaText}
              </Button>
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
};


// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(-1); // No item active by default on mobile

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  // Set first item as active on desktop only
  React.useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setActiveIndex(0); // Desktop: first item active
      } else {
        setActiveIndex(-1); // Mobile: no item active
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="bg-background font-sans">
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
          
          {/* Left Side: Text Content - Takes 1/2 */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tighter">
              Find Your Perfect Virtual Office in Orlando
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground">
              Compare Orlando's top virtual office providers and find professional business addresses in Downtown, Lake Nona, Winter Park, and other prime Central Florida locations.
            </p>
            
            {/* Search Field */}
            <div className="mt-6 md:mt-8">
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder="Search Orlando neighborhoods..."
                  className="w-full"
                  data-testid="input-location-search"
                />
                <Button
                  className="w-full"
                  data-testid="button-search-offices"
                >
                  Search Virtual Offices
                </Button>
              </div>
              {/* Popular suggestions */}
              <div className="mt-3 text-sm text-muted-foreground">
                Popular: <span className="text-primary hover:underline cursor-pointer">Downtown Orlando</span>, 
                <span className="text-primary hover:underline cursor-pointer ml-1">Lake Nona</span>, 
                <span className="text-primary hover:underline cursor-pointer ml-1">Winter Park</span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8">
              <Link href="#providers">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full md:w-auto"
                  data-testid="button-browse-providers"
                >
                  Browse Virtual Offices
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Provider Carousel - Takes 1/2 */}
          <div className="w-full md:w-1/2">
            <HeroProviderCarousel />
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}