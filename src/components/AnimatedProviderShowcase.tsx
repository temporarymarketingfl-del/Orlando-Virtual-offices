"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

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

export default function AnimatedProviderShowcase() {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/providers', { featured: true }],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto mb-12" />
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-80 w-full rounded-3xl" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.data || data.data.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top Virtual Office Providers in Orlando
          </h2>
          <p className="text-muted-foreground">
            Unable to load providers at this time. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  // Diverse fallback images for providers
  const fallbackImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=3540&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3540&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=3540&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=3540&auto=format&fit=crop',
  ];

  // Transform provider data for the animated testimonials component
  const providerTestimonials = data.data.map((provider, index) => {
    // Create a compelling "what they're good for" sentence from specialties
    const goodFor = provider.specialties && provider.specialties.length > 0
      ? `Best for ${provider.specialties.slice(0, 2).join(' and ').toLowerCase()}`
      : provider.excerpt || provider.description;

    // Use provider image or a unique fallback
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

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 mb-8">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4" 
          data-testid="animated-providers-title"
        >
          Top Virtual Office Providers in Orlando
        </h2>
        <p 
          className="text-lg text-muted-foreground text-center max-w-2xl mx-auto"
          data-testid="animated-providers-description"
        >
          Discover Orlando's most trusted virtual office providers. 
          Each specializes in different services to match your business needs.
        </p>
      </div>
      
      {/* Custom animated testimonials with CTA */}
      <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <AnimatedTestimonialsWithCTA 
          testimonials={providerTestimonials} 
          autoplay={true}
        />
      </div>
    </section>
  );
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
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Image Section */}
        <div>
          <div className="relative h-80 w-full">
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
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-between flex-col py-4">
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
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentProvider.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {currentProvider.designation}
            </p>
            
            <motion.p className="text-lg text-muted-foreground mb-6">
              {currentProvider.quote.split(" ").map((word: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {/* CTA Button */}
            <Button
              asChild
              size="default"
              className="gap-2"
              data-testid={`button-view-${currentProvider.slug}`}
            >
              <a href={`/providers/${currentProvider.slug}`}>
                View Locations
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              data-testid="button-prev-provider"
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button hover-elevate active-elevate-2"
            >
              <ArrowLeft className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              data-testid="button-next-provider"
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button hover-elevate active-elevate-2"
            >
              <ArrowRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

