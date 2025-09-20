import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Orlando Virtual Office Providers | Compare Top Services",
  description: "Compare Orlando's top virtual office providers including Regus, Opus, Alliance, and Davinci. Find the perfect virtual office solution for your business with pricing, features, and location coverage.",
  keywords: "Orlando virtual office providers, virtual office comparison, Regus Orlando, Opus Virtual Offices, Alliance Virtual Offices, Davinci Virtual Offices, Orlando business address",
  alternates: {
    canonical: "https://virtualoffice-hub.com/providers"
  },
  openGraph: {
    title: "Orlando Virtual Office Providers | Compare Top Services",
    description: "Compare Orlando's top virtual office providers. Find the perfect virtual office solution for your business.",
    url: "https://virtualoffice-hub.com/providers",
    siteName: "VirtualOffice Hub",
    type: "website",
  },
}

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}