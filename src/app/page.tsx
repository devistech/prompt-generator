"use client";

import { useEffect } from "react";
import { usePromptForge } from "@/hooks/usePromptForge";
import { BannerAd, SidebarAd, StickyFooterAd } from "@/components/layout/BannerAd";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { PromptInput } from "@/components/tool/PromptInput";
import { ClarifyPanel } from "@/components/tool/ClarifyPanel";
import { OutputDisplay } from "@/components/tool/OutputDisplay";

export default function Home() {
  const {
    prompt,
    setPrompt,
    questions,
    optimizedPrompt,
    explanation,
    error,
    showInput,
    showClarify,
    showOutput,
    loading,
    handleInitialSubmit,
    handleClarifySubmit,
    reset,
    scrollToInput,
  } = usePromptForge();

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 relative z-10">
        <Hero onCtaClick={scrollToInput} />
        
        <BannerAd />
        
        <div className="ads-layout">
          <div className="ads-main">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleInitialSubmit}
              loading={loading}
              show={showInput}
            />
            
            <ClarifyPanel
              questions={questions}
              onSubmit={handleClarifySubmit}
              loading={loading}
              show={showClarify}
            />
            
            {optimizedPrompt && (
              <OutputDisplay
                prompt={optimizedPrompt}
                explanation={explanation}
                show={showOutput}
              />
            )}
            
            {showOutput && (
              <div className="mt-8 text-center animate-fade-in">
                <button
                  onClick={reset}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors"
                >
                  Start over with a new prompt
                </button>
              </div>
            )}
          </div>
          
          <SidebarAd />
        </div>
      </main>
      
      <Footer />
      <StickyFooterAd />
    </div>
  );
}
