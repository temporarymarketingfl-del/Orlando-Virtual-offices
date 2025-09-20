import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Providers } from "@/providers"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VirtualOffice Hub - Orlando Virtual Office Providers",
  description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions, business addresses, and professional services in Central Florida's prime business districts.",
  keywords: "virtual office Orlando, business address Orlando, virtual office providers, Orlando workspace, Central Florida virtual offices",
  authors: [{ name: "VirtualOffice Hub" }],
  creator: "VirtualOffice Hub",
  publisher: "VirtualOffice Hub",
  robots: "index, follow",
  alternates: {
    canonical: "https://virtualoffice-hub.com"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://virtualoffice-hub.com",
    title: "VirtualOffice Hub - Orlando Virtual Office Providers",
    description: "Find and compare Orlando's top virtual office providers. Discover flexible workspace solutions in Central Florida.",
    siteName: "VirtualOffice Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualOffice Hub - Orlando Virtual Office Providers",
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
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}