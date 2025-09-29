// Shared provider data - will later be replaced by Notion CMS
import officeImage1 from "@assets/generated_images/Coworking_space_interior_80761a04.png"
import officeImage2 from "@assets/generated_images/Business_meeting_room_012350ca.png"

export interface Provider {
  id: string
  name: string
  fullName: string
  image: any
  rating: number
  reviewCount: number
  orlandoLocations: number
  totalLocations: number
  priceRange: string
  basicPrice: number
  premiumPrice: number
  executivePrice: number
  services: string[]
  description: string
  keyLocations: string[]
  founded: number
  globalPresence: string
  specialties: string[]
  isPopular: boolean
  affiliateUrl: string
  features: {
    businessAddress: boolean
    mailHandling: boolean
    phoneAnswering: boolean
    meetingRooms: boolean
    receptionistServices: boolean
    businessLounge: boolean
    networkingEvents: boolean
    globalLocations: boolean
    mobileApp: boolean
    virtualReceptionist: boolean
  }
  benefits?: string[]
  contactInfo?: {
    phone: string
    email: string
    website: string
  }
}

export const providers: Provider[] = [
  {
    id: "regus",
    name: "Regus",
    fullName: "Regus Downtown Orlando", 
    image: officeImage1,
    rating: 4.6,
    reviewCount: 94,
    orlandoLocations: 5,
    totalLocations: 3000,
    priceRange: "$149 - $599/month",
    basicPrice: 149,
    premiumPrice: 299,
    executivePrice: 599,
    services: ["Virtual Office", "Meeting Rooms", "Mail Service", "Phone Answering"],
    description: "Regus is the world's largest provider of flexible workspace solutions, with a strong presence in Orlando's business districts. Their downtown Orange Avenue location offers prestigious business addresses and comprehensive virtual office services.",
    keyLocations: ["Downtown Orlando", "Lake Nona", "Dr. Phillips", "Millenia", "Winter Park"],
    founded: 1989,
    globalPresence: "100+ countries",
    specialties: ["Enterprise Solutions", "Global Network", "24/7 Access"],
    isPopular: true,
    affiliateUrl: "https://example.com/regus-orlando",
    features: {
      businessAddress: true,
      mailHandling: true,
      phoneAnswering: true,
      meetingRooms: true,
      receptionistServices: true,
      businessLounge: true,
      networkingEvents: true,
      globalLocations: true,
      mobileApp: true,
      virtualReceptionist: false
    },
    benefits: [
      "World's largest flexible workspace network",
      "Prestigious business addresses in prime Orlando locations",
      "24/7 access to business lounges and meeting rooms",
      "Professional mail handling and phone answering",
      "Global network access for business travel",
      "Established brand recognition and credibility"
    ],
    contactInfo: {
      phone: "(407) 555-0100",
      email: "orlando@regus.com",
      website: "https://regus.com/orlando"
    }
  },
  {
    id: "opus-virtual",
    name: "Opus Virtual Offices",
    fullName: "Opus Virtual Offices Orlando",
    image: officeImage2,
    rating: 4.5,
    reviewCount: 78,
    orlandoLocations: 3,
    totalLocations: 150,
    priceRange: "$89 - $399/month",
    basicPrice: 89,
    premiumPrice: 189,
    executivePrice: 399,
    services: ["Virtual Office", "Live Call Answering", "Mail Forwarding", "Meeting Rooms"],
    description: "Opus Virtual Offices provides professional virtual office solutions with live call answering services and premium Orlando business addresses. Known for exceptional customer service and flexible month-to-month plans.",
    keyLocations: ["Downtown Orlando", "Dr. Phillips", "Lake Nona"],
    founded: 2008,
    globalPresence: "50+ US cities",
    specialties: ["Live Answering", "Flexible Plans", "Customer Service"],
    isPopular: false,
    affiliateUrl: "https://example.com/opus-virtual-orlando",
    features: {
      businessAddress: true,
      mailHandling: true,
      phoneAnswering: true,
      meetingRooms: true,
      receptionistServices: true,
      businessLounge: false,
      networkingEvents: false,
      globalLocations: false,
      mobileApp: true,
      virtualReceptionist: true
    },
    benefits: [
      "Most affordable virtual office solutions in Orlando",
      "Live call answering with personalized scripts",
      "Flexible month-to-month contracts with no long-term commitments",
      "Exceptional customer service and local support",
      "Quick setup and immediate availability",
      "Transparent pricing with no hidden fees"
    ],
    contactInfo: {
      phone: "(407) 555-0200", 
      email: "orlando@opusvirtual.com",
      website: "https://opusvirtual.com/orlando"
    }
  },
  {
    id: "alliance-virtual",
    name: "Alliance Virtual Offices",
    fullName: "Alliance Virtual Offices Orlando",
    image: officeImage1,
    rating: 4.4,
    reviewCount: 156,
    orlandoLocations: 4,
    totalLocations: 1200,
    priceRange: "$99 - $449/month",
    basicPrice: 99,
    premiumPrice: 229,
    executivePrice: 449,
    services: ["Virtual Office", "Business Address", "Phone Services", "Conference Rooms"],
    description: "Alliance Virtual Offices is a leading provider of virtual office solutions across Orlando's key business districts. They offer comprehensive packages with professional phone answering and premium business addresses.",
    keyLocations: ["Downtown Orlando", "Millenia", "Winter Park", "Dr. Phillips"],
    founded: 1999,
    globalPresence: "700+ locations worldwide",
    specialties: ["Global Network", "Professional Services", "Established Provider"],
    isPopular: true,
    affiliateUrl: "https://example.com/alliance-virtual-orlando",
    features: {
      businessAddress: true,
      mailHandling: true,
      phoneAnswering: true,
      meetingRooms: true,
      receptionistServices: true,
      businessLounge: true,
      networkingEvents: false,
      globalLocations: true,
      mobileApp: false,
      virtualReceptionist: false
    },
    benefits: [
      "Established provider with 25+ years of experience",
      "Comprehensive virtual office packages",
      "Professional live receptionists for all calls",
      "Multiple Orlando locations for convenience",
      "Global network for business expansion",
      "Reliable mail and package handling services"
    ],
    contactInfo: {
      phone: "(407) 555-0300",
      email: "orlando@alliancevirtual.com", 
      website: "https://alliancevirtual.com/orlando"
    }
  },
  {
    id: "davinci-virtual",
    name: "Davinci Virtual Offices",
    fullName: "Davinci Virtual Offices Orlando",
    image: officeImage2,
    rating: 4.3,
    reviewCount: 203,
    orlandoLocations: 3,
    totalLocations: 2000,
    priceRange: "$79 - $379/month",
    basicPrice: 79,
    premiumPrice: 179,
    executivePrice: 379,
    services: ["Virtual Office", "Live Receptionist", "Mail Services", "Day Offices"],
    description: "Davinci Virtual Offices delivers premium virtual office services with live receptionists and flexible workspace solutions. Their Orlando locations provide prestigious addresses in prime business districts.",
    keyLocations: ["Downtown Orlando", "Lake Nona", "International Drive"],
    founded: 2006,
    globalPresence: "1000+ locations worldwide",
    specialties: ["Live Receptionists", "Premium Locations", "Flexible Terms"],
    isPopular: true,
    affiliateUrl: "https://example.com/davinci-virtual-orlando",
    features: {
      businessAddress: true,
      mailHandling: true,
      phoneAnswering: true,
      meetingRooms: true,
      receptionistServices: true,
      businessLounge: true,
      networkingEvents: true,
      globalLocations: true,
      mobileApp: true,
      virtualReceptionist: true
    },
    benefits: [
      "Premium business addresses in top Orlando districts",
      "Live receptionists trained specifically for your business",
      "Flexible day office and workspace access",
      "Comprehensive mobile app for managing services", 
      "Regular networking events and business mixers",
      "Technology integration with CRM and business tools"
    ],
    contactInfo: {
      phone: "(407) 555-0400",
      email: "orlando@davincivirtual.com",
      website: "https://davincivirtual.com/orlando"
    }
  }
]

export const featureLabels = {
  businessAddress: "Business Address",
  mailHandling: "Mail Handling & Forwarding", 
  phoneAnswering: "Phone Answering Service",
  meetingRooms: "Meeting Room Access",
  receptionistServices: "Live Receptionist",
  businessLounge: "Business Lounge Access",
  networkingEvents: "Networking Events",
  globalLocations: "Global Location Access",
  mobileApp: "Mobile App",
  virtualReceptionist: "Virtual Receptionist AI"
}

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find(provider => provider.id === id)
}

export const getTotalOrlandoLocations = (): number => {
  return providers.reduce((sum, provider) => sum + provider.orlandoLocations, 0)
}