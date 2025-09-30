"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Building } from "lucide-react";
import heroImage from "@assets/generated_images/Modern_office_building_hero_3a280a24.png";
import receptionistPortrait from "@assets/generated_images/Clean_receptionist_portrait_no_squares_2878fa84.png";

export default function HeroSection() {
  const [searchLocation, setSearchLocation] = useState("Orlando, FL");
  const [officeType, setOfficeType] = useState("");

  const handleSearch = () => {
    console.log("Search triggered", { searchLocation, officeType });
  };

  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={typeof heroImage === 'string' ? heroImage : heroImage.src}
          alt="Modern office building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Professional Receptionist */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden xl:block">
          <img
            src={typeof receptionistPortrait === 'string' ? receptionistPortrait : receptionistPortrait.src}
            alt=""
            className="w-80 h-auto"
          />
        </div>
        
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="hero-title">
            Find Your Perfect{" "}
            <span className="text-primary-foreground">Virtual Office</span> in Orlando
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed" data-testid="hero-description">
            Discover the best virtual office providers in Orlando, FL. 
            Get prestigious business addresses, professional meeting rooms, and support services 
            to grow your business in Central Florida's thriving market.
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg" data-testid="hero-search-form">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Location Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="Enter Orlando neighborhood or ZIP code"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full"
                  data-testid="input-location"
                />
              </div>

              {/* Office Type */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Building className="inline w-4 h-4 mr-1" />
                  Office Type
                </label>
                <Select value={officeType} onValueChange={setOfficeType}>
                  <SelectTrigger data-testid="select-office-type">
                    <SelectValue placeholder="Select office type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtual-office">Virtual Office</SelectItem>
                    <SelectItem value="coworking">Coworking Space</SelectItem>
                    <SelectItem value="private-office">Private Office</SelectItem>
                    <SelectItem value="meeting-room">Meeting Room</SelectItem>
                    <SelectItem value="mail-forwarding">Mail Forwarding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full lg:w-auto px-8"
                  data-testid="button-search"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Areas */}
          <div className="mt-6">
            <p className="text-gray-300 text-sm mb-3">Popular Orlando areas:</p>
            <div className="flex flex-wrap gap-2">
              {["Downtown Orlando", "Winter Park", "Lake Nona", "Dr. Phillips", "Millenia"].map((area) => (
                <Button
                  key={area}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  onClick={() => setSearchLocation(area)}
                  data-testid={`button-popular-${area.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {area}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}