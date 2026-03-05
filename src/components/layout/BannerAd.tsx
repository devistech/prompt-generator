"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AD_CLIENT = "ca-pub-8325432471950221";

interface AdContainerProps {
  adSlot: string;
  adFormat?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

function AdContainer({ adSlot, adFormat = "auto", className = "" }: AdContainerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (adRef.current && !initialized.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

export function BannerAd() {
  return (
    <div className="ads-top">
      <AdContainer 
        adSlot="9096755497" 
        adFormat="auto"
        className="w-full"
      />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="ads-sidebar">
      <AdContainer 
        adSlot="7141985500" 
        adFormat="auto"
        className="w-[300px] h-[600px]"
      />
    </div>
  );
}

export function StickyFooterAd() {
  return (
    <div className="ads-sticky-footer">
      <AdContainer 
        adSlot="8079662652" 
        adFormat="auto"
        className="w-full"
      />
    </div>
  );
}
