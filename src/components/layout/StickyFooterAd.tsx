"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function StickyFooterAd() {
  const adRef = useRef<HTMLModElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Ad error:", e);
      }
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-[90px] bg-[var(--ai-navy-light)] border-t border-[var(--glass-border)] flex items-center justify-center z-50">
      <div className="max-w-[728px] w-full mx-auto px-4">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client="ca-pub-8325432471950221"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
