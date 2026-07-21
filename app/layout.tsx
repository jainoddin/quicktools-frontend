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
import { ToastProvider } from "@/contexts/ToastContext";

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
    default: "QuickTools.ai - The Ultimate AI Toolkit with 100+ Premium AI Tools",
    template: "%s | QuickTools.ai"
  },
  description: "QuickTools.ai is the ultimate AI toolkit offering 100+ premium AI tools for content creators, marketers, developers, HR, and businesses. Generate stunning AI images, write code, craft marketing plans, chat with AI, remove backgrounds, convert PDFs, and more—all in one powerful, free-to-try dashboard.",
  keywords: [
    "AI Tools", "Free AI Tools", "Premium AI Tools", "QuickTools", "AI Toolkit", "Image Generator", 
    "Background Remover", "AI Chat", "PDF Converter", "AI Code Writer", "Code Explainer", "AI Code Generator", 
    "Marketing AI", "AI Marketing Plan", "AI Business Plan", "SEO Topical Map Generator", "AI Sales Funnel",
    "AI Ebook Writer", "AI Grant Proposal", "AI Social Media Calendar", "AI Copywriting", "AI Content Creator",
    "AI Essay Writer", "AI Blog Generator", "AI Video Script", "AI Podcast Script", "AI Brand Guidelines",
    "Startup Ideas AI", "AI Competitor Analysis", "AI SWOT Analysis", "AI Product Launch", "AI Value Proposition",
    "AI OKR Generator", "AI Pitch Deck", "AI Business Model Canvas", "AI Pricing Strategy", "AI Training Module",
    "AI Job Description", "AI Employee Review", "AI Cover Letter", "AI Resume Builder", "AI Interview Questions",
    "AI Sales Script", "AI Cold Email", "AI Lead Magnet", "AI Objection Handling", "AI Course Creator",
    "AI Grammar Checker", "AI Translator", "AI Text Summarizer", "AI Story Generator", "AI Poem Generator",
    "AI Apology Letter", "AI Resignation Letter", "AI Travel Planner", "AI Meal Planner", "AI Workout Plan",
    "AI Dream Interpreter", "AI App Architecture", "AI SQL Generator", "AI Regex Generator", "AI Git Command",
    "CSS Box Shadow Generator", "Password Generator", "QR Code Generator", "URL Shortener", "JSON Formatter",
    "Best AI Tools 2026", "AI Productivity Suite", "AI Platform", "Generative AI", "AI for Business", "AI for Marketing",
    "Free AI Generator", "AI Content Strategy", "AI SEO Tools", "AI Workflow Automation"
  ],
  authors: [{ name: "QuickTools.ai Team", url: "https://quicktool.space/about" }],
  creator: "QuickTools.ai",
  publisher: "QuickTools.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  applicationName: "QuickTools.ai",
  generator: "Next.js",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quicktool.space",
    title: "QuickTools.ai - The Ultimate AI Toolkit with 100+ Premium AI Tools",
    description: "Generate stunning AI images, craft business plans, write code, chat with AI, remove backgrounds, and more with 100+ premium AI tools. Try for free today!",
    siteName: "QuickTools.ai",
    images: [
      {
        url: "https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png",
        width: 1200,
        height: 630,
        alt: "QuickTools.ai - The Ultimate AI Toolkit",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickTools.ai - 100+ Premium AI Tools in One Place",
    description: "The ultimate AI toolkit for creators, marketers, developers, and businesses. Generate content, code, images, and strategy instantly.",
    creator: "@quicktoolsai",
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: ['/icon.svg'],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
  },
  alternates: {
    canonical: 'https://quicktool.space',
    languages: {
      'en-US': 'https://quicktool.space/en-US',
    },
  },
  verification: {
    google: "u2eV2y9kS-0GuLrl16lDMrGz6k_HoCb5jIZieWTTiic",
    yandex: "yandex_verification_code", // Placeholder for future
    yahoo: "yahoo_verification_code",   // Placeholder for future
  },
  appleWebApp: {
    capable: true,
    title: "QuickTools.ai",
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
    >
      <body className="flex flex-col min-h-[100dvh] bg-[#F8FAFC] text-[#111827] selection:bg-[#4F46E5] selection:text-white">
        {/* Razorpay Checkout SDK */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        {/* Microsoft Clarity Analytics - Only in Production */}
        {process.env.NODE_ENV === 'production' && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xoi9as94lf");
            `}
          </Script>
        )}

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
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
