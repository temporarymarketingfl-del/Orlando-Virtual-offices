'use client'
import React, { useState } from 'react';

// --- Data for the virtual office providers accordion ---
interface ProviderItem {
  id: number;
  category: string;
  providerName: string;
  sellingPoint: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  logoColor: string;
  bgGradient: string;
}

const accordionItems: ProviderItem[] = [
  {
    id: 1,
    category: 'All-Inclusive',
    providerName: 'Opus Virtual Offices',
    sellingPoint: 'Complete business solutions from $99/month',
    features: ['Professional phone answering', 'Mail handling & forwarding', 'Meeting room access'],
    ctaText: 'View Opus Locations',
    ctaLink: '/locations?provider=opus',
    logoColor: '#1e40af',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  {
    id: 2,
    category: 'Cost Savvy',
    providerName: 'iPostal',
    sellingPoint: 'Affordable solutions starting at $29/month',
    features: ['Basic mail service', 'Digital mail scanning', 'Multiple Orlando locations'],
    ctaText: 'View iPostal Locations',
    ctaLink: '/locations?provider=ipostal',
    logoColor: '#059669',
    bgGradient: 'from-green-50 to-green-100'
  },
  {
    id: 3,
    category: 'Prestigious Address',
    providerName: 'Davinci Virtual',
    sellingPoint: 'Premium downtown addresses from $79/month',
    features: ['Prime business districts', 'Professional reception', 'Boardroom access'],
    ctaText: 'View Davinci Locations',
    ctaLink: '/locations?provider=davinci',
    logoColor: '#dc2626',
    bgGradient: 'from-red-50 to-red-100'
  },
  {
    id: 4,
    category: 'Prime Locations',
    providerName: 'Regus',
    sellingPoint: 'Global network with Orlando presence',
    features: ['Downtown Orlando towers', 'Worldwide access', '24/7 building access'],
    ctaText: 'View Regus Locations',
    ctaLink: '/locations?provider=regus',
    logoColor: '#7c3aed',
    bgGradient: 'from-purple-50 to-purple-100'
  }
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: { 
  item: ProviderItem;
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
        bg-gradient-to-br ${item.bgGradient} border border-gray-200
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Inactive State: Category Label */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-gray-700 text-lg font-semibold whitespace-nowrap transform rotate-90"
          >
            {item.category}
          </span>
        </div>
      )}

      {/* Active State: Provider Card */}
      {isActive && (
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Provider Header */}
          <div className="text-center">
            {/* Provider Logo Placeholder */}
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: item.logoColor }}
            >
              {item.providerName.split(' ').map(word => word[0]).join('')}
            </div>
            
            {/* Provider Name */}
            <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-provider-${item.providerName.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.providerName}
            </h3>
            
            {/* Selling Point */}
            <p className="text-sm font-medium text-gray-700 mb-4" data-testid={`text-selling-point-${item.id}`}>
              {item.sellingPoint}
            </p>
          </div>

          {/* Features List */}
          <div className="flex-1">
            <ul className="space-y-2">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span data-testid={`text-feature-${item.id}-${index}`}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            <a
              href={item.ctaLink}
              className="block w-full text-center py-3 px-4 text-white font-semibold rounded-lg transition-colors duration-300"
              style={{ backgroundColor: item.logoColor }}
              data-testid={`button-cta-${item.providerName.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.ctaText}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans">
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tighter">
              Find Your Perfect Virtual Office in Orlando
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Compare Orlando's top virtual office providers and find professional business addresses in Downtown, Lake Nona, Winter Park, and other prime Central Florida locations.
            </p>
            
            {/* Search Field */}
            <div className="mt-8 max-w-lg mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search Orlando neighborhoods..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="input-location-search"
                />
                <button
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap"
                  data-testid="button-search-offices"
                >
                  Search Virtual Offices
                </button>
              </div>
              {/* Popular suggestions */}
              <div className="mt-3 text-sm text-gray-500">
                Popular: <span className="text-blue-600 hover:underline cursor-pointer">Downtown Orlando</span>, 
                <span className="text-blue-600 hover:underline cursor-pointer ml-1">Lake Nona</span>, 
                <span className="text-blue-600 hover:underline cursor-pointer ml-1">Winter Park</span>
              </div>
            </div>
            
            <div className="mt-8">
              <a
                href="#providers"
                className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
                data-testid="button-browse-providers"
              >
                Browse Virtual Offices
              </a>
            </div>
          </div>

          {/* Right Side: Provider Accordion */}
          <div className="w-full md:w-1/2">
            {/* Provider accordion showing featured virtual office providers */}
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
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