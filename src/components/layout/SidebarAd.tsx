"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function SidebarAd() {
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
    return <div className="hidden lg:block sticky top-[120px] w-[300px] h-[600px]" />;
  }

  return (
    <div className="hidden lg:block sticky top-[120px] w-[300px] h-[600px]">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8325432471950221"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="vertical"
        data-full-width-responsive="true"
      />
    </div>
  );
}
