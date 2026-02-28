"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function BannerAd() {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Ad error:", e);
      }
    }
  }, []);

  return (
    <div className="w-full h-[50px] bg-[var(--glass)] border-b border-[var(--glass-border)] flex items-center justify-center">
      <div className="max-w-[728px] w-full mx-auto">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
