import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Providers } from "@/providers"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Orlando Virtual Offices - Find Your Perfect Virtual Office Provider",
  description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions, business addresses, and professional services in Central Florida's prime business districts.",
  keywords: "virtual office Orlando, business address Orlando, virtual office providers, Orlando workspace, Central Florida virtual offices",
  authors: [{ name: "Orlando Virtual Offices" }],
  creator: "Orlando Virtual Offices",
  publisher: "Orlando Virtual Offices",
  robots: "index, follow",
  alternates: {
    canonical: "https://orlandovirtualoffices.com"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orlandovirtualoffices.com",
    title: "Orlando Virtual Offices - Find Your Perfect Virtual Office Provider",
    description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions in Central Florida.",
    siteName: "Orlando Virtual Offices",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orlando Virtual Offices - Find Your Perfect Virtual Office Provider",
    description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions in Central Florida.",
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}