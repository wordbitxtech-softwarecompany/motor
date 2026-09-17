import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import { LanguageProvider } from "@/components/LanguageContext";
import { SITE_URL } from "@/lib/site";
import { HERO } from "@/lib/media";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: {
    default: 'MOTOR | Pak | Cars, Bikes, Scooties, EVs 2026',
    template: '%s | MOTOR | Pak',
  },
  description:
    'Explore cars, bikes, scooties, SUVs, EVs and hybrids in Pakistan. Prices, specs and 2026 launches on MOTOR | Pak — WordbitX group of companies.',
  applicationName: 'MOTOR | Pak',
  authors: [{ name: 'MOTOR | Pak', url: SITE_URL }],
  creator: 'WordbitX group of companies',
  publisher: 'WordbitX group of companies',
  category: 'Automotive',
  keywords: [
    'cars in Pakistan',
    'car prices in Pakistan',
    'new cars in Pakistan',
    'used cars in Pakistan',
    'bikes in Pakistan',
    'bike prices in Pakistan',
    'electric cars Pakistan',
    'hybrid cars Pakistan',
    'electric bikes Pakistan',
    'new cars 2026 Pakistan',
    'Toyota Corolla price in Pakistan',
    'Honda CD 70 price in Pakistan',
    'car specifications Pakistan',
    'compare cars Pakistan',
  ],
  formatDetection: { email: false, address: true, telephone: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE_URL,
    siteName: 'MOTOR | Pak',
    title: 'MOTOR | Pak | Cars, Bikes, Scooties, EVs 2026',
    description:
      'Cars, bikes, scooties, SUVs, EVs and hybrids in Pakistan — MOTOR | Pak by WordbitX group of companies.',
    images: [{ url: HERO.showroom, width: 1200, height: 630, alt: 'MOTOR | Pak — cars and bikes marketplace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOTOR Pakistan | Cars, Bikes, Prices, EVs & Hybrids 2026',
    description: 'Latest car and bike prices, specifications and 2026 launches in Pakistan.',
    images: [HERO.showroom],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-PK">
      <head>
        <SchemaJsonLd schema={organizationSchema()} />
        <SchemaJsonLd schema={websiteSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-600 selection:text-white">
        <LanguageProvider>
          <Header />
          <main id="main-content" className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
