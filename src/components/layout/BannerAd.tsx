"use client";

import dynamic from "next/dynamic";
import React from "react";

export function BannerAd() {
  const AdComponent = dynamic(() => import("./AdUnit").then(mod => mod.AdUnit), {
    ssr: false,
    loading: () => <div className="ads-placeholder" />
  });
  
  return (
    <div className="ads-top">
      <AdComponent adSlot="9096755497" />
    </div>
  );
}

export function SidebarAd() {
  const AdComponent = dynamic(() => import("./AdUnit").then(mod => mod.AdUnit), {
    ssr: false,
    loading: () => <div className="ads-placeholder-sidebar" />
  });
  
  return (
    <div className="ads-sidebar">
      <AdComponent adSlot="7141985500" />
    </div>
  );
}

export function StickyFooterAd() {
  const AdComponent = dynamic(() => import("./AdUnit").then(mod => mod.AdUnit), {
    ssr: false,
    loading: () => <div className="ads-placeholder-footer" />
  });
  
  return (
    <div className="ads-sticky-footer">
      <AdComponent adSlot="8079662652" />
    </div>
  );
}
