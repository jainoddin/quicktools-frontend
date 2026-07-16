'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  clearAnalyticsUser,
  setAnalyticsUser,
  trackLogin,
} from '@/lib/analytics';

/**
 * Keeps GA4 user_id + user_properties in sync with Auth.
 * Fires login once per browser session when user becomes authenticated.
 */
export default function AnalyticsIdentity() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const prevAuth = useRef<boolean | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user?.id) {
      setAnalyticsUser({
        id: user.id,
        plan: user.plan,
        role: user.role,
      });

      const sessionKey = `ga_login_${user.id}`;
      if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem(sessionKey)) {
        trackLogin('google');
        sessionStorage.setItem(sessionKey, '1');
      }
    } else if (prevAuth.current === true) {
      clearAnalyticsUser();
    }

    prevAuth.current = isAuthenticated;
  }, [user, isAuthenticated, isLoading]);

  return null;
}
