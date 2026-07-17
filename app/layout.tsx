import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/shared/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AnalyticsIdentity from "@/components/analytics/AnalyticsIdentity";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quicktool.space'),
  title: {
    default: "QuickTools.ai - The Ultimate AI Toolkit for Creators",
    template: "%s | QuickTools.ai"
  },
  description: "Generate stunning AI images, chat with AI, remove backgrounds, convert PDFs, and write code all in one powerful dashboard.",
  keywords: ["AI Tools", "Image Generator", "Background Remover", "AI Chat", "PDF Converter", "AI Code Writer", "QuickTools"],
  publisher: "QuickTools.ai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quicktool.space",
    title: "QuickTools.ai - The Ultimate AI Toolkit",
    description: "Generate stunning AI images, chat with AI, remove backgrounds, convert PDFs, and write code all in one powerful dashboard.",
    siteName: "QuickTools.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickTools.ai - The Ultimate AI Toolkit",
    description: "Generate stunning AI images, chat with AI, remove backgrounds, convert PDFs, and write code all in one powerful dashboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "u2eV2y9kS-0GuLrl16lDMrGz6k_HoCb5jIZieWTTiic",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col min-h-[100dvh] bg-[#F8FAFC] text-[#111827] selection:bg-[#4F46E5] selection:text-white">
        {/* Razorpay Checkout SDK */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        <GoogleAnalytics />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "QuickTools.ai",
            "url": "https://quicktool.space",
            "logo": "https://quicktool.space/icon.svg",
            "sameAs": ["https://twitter.com/quicktoolsai"],
            "description": "Premium AI tools platform for creators and developers."
          })}}
        />
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "QuickTools.ai",
            "url": "https://quicktool.space",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://quicktool.space/articles?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        {/* WebPage and SiteNavigationElement Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://quicktool.space/#webpage",
                "url": "https://quicktool.space/",
                "name": "QuickTools.ai - The Ultimate AI Toolkit for Creators",
                "isPartOf": { "@id": "https://quicktool.space/#website" }
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Home",
                "url": "https://quicktool.space/"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Articles",
                "url": "https://quicktool.space/articles"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "News",
                "url": "https://quicktool.space/news"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Blog",
                "url": "https://quicktool.space/blog"
              }
            ]
          })}}
        />

        <AuthProvider>
          <AnalyticsIdentity />
          <AnalyticsClickTracker />
          <SplashScreen />
          <Header />
          <main className="flex flex-col flex-grow">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}
