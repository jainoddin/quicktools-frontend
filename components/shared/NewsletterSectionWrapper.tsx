'use client';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function NewsletterSectionWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading || isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
}
