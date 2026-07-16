'use client';

import { useEffect } from 'react';
import {
  trackEvent,
  trackNavClick,
  trackToolOpen,
  trackContentOpen,
  trackUpgradeClick,
} from '@/lib/analytics';

/**
 * Delegated click tracker for:
 * - [data-track="event_name"] elements (with data-track-* params)
 * - Important nav / tool / content / upgrade links (auto-classified)
 */
export default function AnalyticsClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const tracked = target.closest('[data-track]') as HTMLElement | null;
      if (tracked) {
        const eventName = tracked.getAttribute('data-track');
        if (eventName) {
          const params: Record<string, string> = {};
          for (const attr of tracked.attributes) {
            if (attr.name.startsWith('data-track-') && attr.name !== 'data-track') {
              const key = attr.name.replace('data-track-', '').replace(/-/g, '_');
              params[key] = attr.value;
            }
          }
          trackEvent(eventName, params);
        }
        return;
      }

      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//')) return;

      const label =
        anchor.getAttribute('aria-label') ||
        anchor.textContent?.trim().slice(0, 60) ||
        href;

      if (href.startsWith('/pricing')) {
        const lower = label.toLowerCase();
        if (
          lower.includes('upgrade') ||
          lower.includes('pro') ||
          lower.includes('starter') ||
          lower.includes('get ') ||
          lower.includes('unlock')
        ) {
          trackUpgradeClick('cta_link');
        } else {
          trackNavClick(label, href);
        }
        return;
      }

      if (href.startsWith('/tools/') && href !== '/tools/') {
        const tool = href.replace('/tools/', '').split(/[?#]/)[0];
        trackToolOpen(tool, 'link');
        return;
      }

      if (href.startsWith('/blog/') && href !== '/blog/') {
        trackContentOpen('blog', href.replace('/blog/', '').split(/[?#]/)[0]);
        return;
      }

      if (href.startsWith('/articles/') && href !== '/articles/') {
        trackContentOpen('article', href.replace('/articles/', '').split(/[?#]/)[0]);
        return;
      }

      if (href.startsWith('/news/') && href !== '/news/') {
        trackContentOpen('news', href.replace('/news/', '').split(/[?#]/)[0]);
        return;
      }

      const navPaths = [
        '/',
        '/tools',
        '/blog',
        '/articles',
        '/news',
        '/about',
        '/contact',
        '/login',
        '/signup',
        '/dashboard',
        '/faq',
        '/help',
      ];
      if (navPaths.includes(href) || href.startsWith('/dashboard') || href.startsWith('/checkout')) {
        trackNavClick(label, href);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
