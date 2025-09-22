'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
          ? 'w-[400px] md:w-[400px] h-auto md:h-[450px]' 
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tighter">
              Find Your Perfect Virtual Office in Orlando
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Compare Orlando's top virtual office providers and find professional business addresses in Downtown, Lake Nona, Winter Park, and other prime Central Florida locations.
            </p>
            
            {/* Search Field */}
            <div className="mt-8 max-w-lg mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Search Orlando neighborhoods..."
                  className="flex-1"
                  data-testid="input-location-search"
                />
                <Button
                  className="whitespace-nowrap"
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
            
            <div className="mt-8">
              <Link href="#providers">
                <Button
                  variant="secondary"
                  size="lg"
                  data-testid="button-browse-providers"
                >
                  Browse Virtual Offices
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Provider Accordion */}
          <div className="w-full md:w-1/2">
            {/* Provider accordion showing featured virtual office providers */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}