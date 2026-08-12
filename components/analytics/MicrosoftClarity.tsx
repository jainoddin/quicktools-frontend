'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function MicrosoftClarity() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const onConsent = (event: Event) => {
      setHasConsent(Boolean((event as CustomEvent<{ granted: boolean }>).detail?.granted));
    };
    setHasConsent(localStorage.getItem('quicktools_cookie_consent') === 'true');
    window.addEventListener('quicktools:analytics-consent', onConsent);
    return () => window.removeEventListener('quicktools:analytics-consent', onConsent);
  }, []);

  if (process.env.NODE_ENV !== 'production' || !hasConsent) return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xoi9as94lf");`}
    </Script>
  );
}
