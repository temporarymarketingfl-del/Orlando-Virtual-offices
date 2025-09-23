import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Orlando Virtual Office Locations | Premium Business Districts",
  description: "Explore Orlando's top virtual office locations across Downtown, Lake Nona, Dr. Phillips, Winter Park, and more premium business districts in Central Florida.",
  keywords: "Orlando virtual office locations, Downtown Orlando virtual office, Lake Nona business address, Dr. Phillips virtual office, Winter Park business address",
  alternates: {
    canonical: "https://orlandovirtualoffices.com/locations"
  },
  openGraph: {
    title: "Orlando Virtual Office Locations | Premium Business Districts",
    description: "Explore Orlando's top virtual office locations across premium business districts in Central Florida.",
    url: "https://orlandovirtualoffices.com/locations",
    siteName: "Orlando Virtual Offices",
    type: "website",
  },
}

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}