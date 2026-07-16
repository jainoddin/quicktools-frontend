'use client';

import { getEndpoint } from '@/lib/api';
import { trackLoginStart } from '@/lib/analytics';

export default function GoogleLoginButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={getEndpoint('/api/auth/google')}
      onClick={() => trackLoginStart('google')}
      className={className}
    >
      {children}
    </a>
  );
}
