import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/shared/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import AnalyticsIdentity from "@/components/analytics/AnalyticsIdentity";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import DeferredQuickToolsNavigator from "@/components/navigator/DeferredQuickToolsNavigator";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quicktool.space'),
  title: {
    default: "QuickTool | 100+ Affordable AI Tools for Work and Creativity",
    template: "%s | QuickTool"
  },
  description: "Write content, generate images, plan a business, understand code, and finish everyday work with 100+ affordable AI and utility tools.",
  authors: [{ name: "QuickTool Team", url: "https://quicktool.space/author/quicktool-team" }],
  creator: "QuickTool",
  publisher: "QuickTool",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  applicationName: "QuickTool",
  generator: "Next.js",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quicktool.space",
    title: "QuickTool | 100+ Affordable AI Tools for Work and Creativity",
    description: "Write content, generate images, plan a business, understand code, and finish everyday work with 100+ affordable AI and utility tools.",
    siteName: "QuickTool",
    images: [
      {
        url: "https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png",
        width: 1200,
        height: 630,
        alt: "QuickTool - The Ultimate AI Toolkit",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickTool | 100+ Affordable AI Tools for Work and Creativity",
    description: "Write content, generate images, plan a business, understand code, and finish everyday work with 100+ affordable AI and utility tools.",
    creator: "@quicktool_ai",
    images: ["https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/feed/news', title: 'QuickTool News RSS Feed' },
        { url: '/feed/articles', title: 'QuickTool Articles RSS Feed' },
        { url: '/feed/blogs', title: 'QuickTool Blog RSS Feed' }
      ]
    }
  },
  verification: {
    google: "u2eV2y9kS-0GuLrl16lDMrGz6k_HoCb5jIZieWTTiic",
  },
  appleWebApp: {
    capable: true,
    title: "QuickTool",
    statusBarStyle: "black-translucent",
  },
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
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning={true} className="flex flex-col min-h-[100dvh] bg-[#F8FAFC] text-[#111827] selection:bg-[#4F46E5] selection:text-white">
        <MicrosoftClarity />
        <GoogleAnalytics />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "QuickTool",
              "url": "https://quicktool.space",
              "logo": "https://quicktool.space/icon.svg",
              "sameAs": [
                "https://twitter.com/quicktools_ai",
                "https://www.linkedin.com/company/quicktools-ai"
              ]
            })
          }}
        />


        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "QuickTool",
              "url": "https://quicktool.space",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://quicktool.space/articles?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {/* WebPage and SiteNavigationElement Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://quicktool.space/#webpage",
                  "url": "https://quicktool.space/",
                  "name": "QuickTool - The Ultimate AI Toolkit for Creators",
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
            })
          }}
        />

        <ToastProvider>
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
            <DeferredQuickToolsNavigator />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
