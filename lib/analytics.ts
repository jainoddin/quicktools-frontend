/**
 * Google Analytics 4 — full journey tracking for QuickTools.
 *
 * Never send name, email, phone, or other PII.
 * Use MongoDB user id as user_id for de-duplication.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2TKCY5NQPG';

type EventParams = Record<string, string | number | boolean | undefined | null>;

type GtagCommand = 'config' | 'event' | 'set' | 'js' | 'consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: GtagCommand | string, ...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...(args as [string, ...unknown[]]));
}

function clean(params?: EventParams) {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue;
    out[k] = v;
  }
  return out;
}

export function pageview(url: string) {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    send_page_view: true,
  });
}

export function trackEvent(action: string, params?: EventParams) {
  gtag('event', action, clean(params));
}

/** Bind logged-in user so GA merges sessions across devices (no PII). */
export function setAnalyticsUser(user: {
  id: string;
  plan?: string;
  role?: string;
}) {
  if (!user.id) return;

  gtag('config', GA_MEASUREMENT_ID, {
    user_id: user.id,
  });

  gtag('set', 'user_properties', {
    plan: (user.plan || 'free').toLowerCase(),
    user_role: user.role || 'user',
  });
}

export function clearAnalyticsUser() {
  gtag('config', GA_MEASUREMENT_ID, {
    user_id: null,
  });
  gtag('set', 'user_properties', {
    plan: 'guest',
    user_role: 'guest',
  });
}

export function updateAnalyticsConsent(granted: boolean) {
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });
}

/* ─── Auth ─── */
export function trackLogin(method = 'google') {
  trackEvent('login', { method });
}

export function trackLogout() {
  trackEvent('logout');
}

export function trackLoginStart(method = 'google') {
  trackEvent('login_start', { method });
}

/* ─── Navigation & browse ─── */
export function trackNavClick(label: string, href?: string) {
  trackEvent('nav_click', { link_text: label, link_url: href });
}

export function trackToolOpen(tool: string, source?: string) {
  trackEvent('tool_open', { tool_name: tool, source });
}

export function trackToolFilter(filterType: string, value: string) {
  trackEvent('tool_filter', { filter_type: filterType, filter_value: value });
}

export function trackSearch(term: string, location?: string) {
  trackEvent('search', {
    search_term: term.slice(0, 100),
    search_location: location,
  });
}

/* ─── Tools usage ─── */
export function trackToolGenerate(
  tool: string,
  extra?: EventParams
) {
  trackEvent('tool_generate', {
    tool_name: tool,
    ...extra,
  });
}

export function trackFileDownload(tool: string, format?: string, source?: string) {
  trackEvent('file_download', {
    tool_name: tool,
    file_format: format,
    download_source: source,
  });
}

export function trackShare(contentType: string, method: string, extra?: EventParams) {
  trackEvent('share', {
    content_type: contentType,
    method,
    ...extra,
  });
}

export function trackFavorite(itemType: string, action: 'add' | 'remove', id?: string) {
  trackEvent('favorite', {
    item_type: itemType,
    favorite_action: action,
    item_id: id,
  });
}

/* ─── Content ─── */
export function trackContentOpen(contentType: 'blog' | 'article' | 'news', slug: string) {
  trackEvent('content_open', {
    content_type: contentType,
    content_slug: slug,
  });
}

export function trackContentFilter(contentType: string, category: string) {
  trackEvent('content_filter', {
    content_type: contentType,
    filter_value: category,
  });
}

/* ─── Leads ─── */
export function trackContactSubmit(subject?: string) {
  trackEvent('generate_lead', {
    lead_type: 'contact',
    subject: subject?.slice(0, 80),
  });
}

export function trackNewsletterSubscribe(source?: string) {
  trackEvent('newsletter_subscribe', {
    method: 'email',
    source,
  });
}

/* ─── Monetization funnel ─── */
export function trackUpgradeClick(source: string, tool?: string) {
  trackEvent('select_promotion', {
    promotion_name: 'upgrade',
    source,
    tool_name: tool,
  });
}

export function trackViewPromotion(source: string, tool?: string) {
  trackEvent('view_promotion', {
    promotion_name: 'upgrade',
    source,
    tool_name: tool,
  });
}

export function trackBeginCheckout(plan: string, value?: number) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: value ?? 0,
    item_name: plan,
  });
}

export function trackCheckoutContinue(plan: string, value?: number) {
  trackEvent('checkout_progress', {
    currency: 'USD',
    value: value ?? 0,
    item_name: plan,
    checkout_step: 'review_to_payment',
  });
}

export function trackAddPaymentInfo(method: string, plan?: string) {
  trackEvent('add_payment_info', {
    payment_type: method,
    item_name: plan,
  });
}

export function trackPurchase(opts: {
  plan: string;
  value: number;
  transactionId?: string;
}) {
  trackEvent('purchase', {
    currency: 'USD',
    value: opts.value,
    transaction_id: opts.transactionId,
    item_name: opts.plan,
  });
}

export function trackBillingPeriodToggle(period: 'monthly' | 'yearly') {
  trackEvent('billing_period_toggle', { billing_period: period });
}

export function trackCancelPlan(plan?: string) {
  trackEvent('cancel_subscription', { item_name: plan });
}

/* ─── Account ─── */
export function trackSettingsSave(section?: string) {
  trackEvent('settings_save', { settings_section: section || 'profile' });
}

export function trackDeactivateAccount() {
  trackEvent('deactivate_account');
}

export function trackAvatarChange() {
  trackEvent('avatar_change');
}
