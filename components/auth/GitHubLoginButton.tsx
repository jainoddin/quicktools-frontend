'use client';

import { getEndpoint } from '@/lib/api';
import { trackLoginStart } from '@/lib/analytics';

export default function GitHubLoginButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={getEndpoint('/api/auth/github')}
      onClick={() => trackLoginStart('github')}
      className={className}
    >
      {children}
    </a>
  );
}
