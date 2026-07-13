'use client';

import React from 'react';
import { useAuth } from './../../contexts/AuthContext';

export default function HideWhenAuthenticated({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // If still checking auth state, we can return null to prevent hydration mismatch,
  // or return the children. Usually better to return null to avoid flashing.
  if (isLoading || isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
