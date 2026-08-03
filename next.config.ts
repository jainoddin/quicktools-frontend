import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Multiple lockfiles exist above this app; keep Turbopack scoped to the frontend.
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-0a928134dcdc420da2af02e6238ef06b.r2.dev' },
      { protocol: 'https', hostname: 'pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'image.pollinations.ai' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
    ],
  },
  async redirects() {
    return [
      // Redirect favicon.ico to new icon to prevent 404
      {
        source: '/favicon.ico',
        destination: '/icon',
        permanent: true,
      },
      // Resolve Content Intent Duplicates
      {
        source: '/articles/ai-website-builders-evaluated-top-platforms',
        destination: '/articles/best-ai-website-builders-2026',
        permanent: true,
      },
      // Redirect specific 2024 blogs/articles to 2026
      {
        source: '/blog/best-free-ai-tools-the-ultimate-guide-to-boosting-productivity-in-2024',
        destination: '/blog/best-free-ai-tools-the-ultimate-guide-to-boosting-productivity-in-2026',
        permanent: true,
      },
      {
        source: '/blog/mastering-chatgpt-prompts-the-definitive-guide-to-prompt-engineering-for-2024',
        destination: '/blog/mastering-chatgpt-prompts-the-definitive-guide-to-prompt-engineering-for-2026',
        permanent: true,
      },
      {
        source: '/blog/25-best-ai-tools-to-supercharge-your-productivity-and-creativity-in-2024',
        destination: '/blog/25-best-ai-tools-to-supercharge-your-productivity-and-creativity-in-2026',
        permanent: true,
      },
      {
        source: '/blog/27-high-profit-ai-business-ideas-to-launch-in-2024-the-ultimate-entrepreneurs-playbook',
        destination: '/blog/27-high-profit-ai-business-ideas-to-launch-in-2026-the-ultimate-entrepreneurs-playbook',
        permanent: true,
      },
      {
        source: '/blog/beyond-the-syntax-how-ai-coding-tools-are-redefining-software-engineering-in-2024',
        destination: '/blog/beyond-the-syntax-how-ai-coding-tools-are-redefining-software-engineering-in-2026',
        permanent: true,
      },
      {
        source: '/blog/boost-your-google-rankings-the-best-ai-seo-tools-for-2024',
        destination: '/blog/boost-your-google-rankings-the-best-ai-seo-tools-for-2026',
        permanent: true,
      },
      {
        source: '/blog/claude-ai-the-ultimate-deep-dive-into-anthropics-masterpiece-2024-edition',
        destination: '/blog/claude-ai-the-ultimate-deep-dive-into-anthropics-masterpiece-2026-edition',
        permanent: true,
      },
      {
        source: '/blog/the-ultimate-guide-to-choosing-the-best-ai-website-builder-in-2024-build-your-brand-in-minutes',
        destination: '/blog/the-ultimate-guide-to-choosing-the-best-ai-website-builder-in-2026-build-your-brand-in-minutes',
        permanent: true,
      },
      {
        source: '/blog/top-5-ai-voice-generators-comparing-the-best-text-to-speech-tools-for-2024',
        destination: '/blog/top-5-ai-voice-generators-comparing-the-best-text-to-speech-tools-for-2026',
        permanent: true,
      },
      {
        source: '/blog/unlock-growth-essential-ai-tools-for-small-businesses-in-2024',
        destination: '/blog/unlock-growth-essential-ai-tools-for-small-businesses-in-2026',
        permanent: true,
      },
      {
        source: '/blog/mastering-the-ai-logo-generator-the-ultimate-guide-to-instant-branding-in-2025',
        destination: '/blog/mastering-the-ai-logo-generator-the-ultimate-guide-to-instant-branding-in-2026',
        permanent: true,
      },
      // Redirect NVIDIA Rubin duplicate to the main article
      {
        source: '/news/nvidia-unveils-rubin-the-next-generation-ai-chip-powering-the-future',
        destination: '/news/nvidia-unveils-rubin-next-gen-ai-chip-powering-future',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Use environment variable if available (e.g. localhost for dev), otherwise fallback to live backend
        destination: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` : 'https://quicktools-backend-wlm5.onrender.com/api/:path*',
      }
    ];
  },
};

export default nextConfig;
