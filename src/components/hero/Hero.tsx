import React from "react";

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative z-10 pt-16 md:pt-24 pb-12 text-center">
      <div className="max-w-[960px] mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 animate-fade-in" style={{ letterSpacing: "-0.02em" }}>
          Turn Basic Prompts into{" "}
          <span className="text-gradient">Production-Ready Instructions</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-[600px] mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          AI analyzes, clarifies, and restructures your coding prompts for maximum precision.
        </p>
        <button
          onClick={onCtaClick}
          className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl text-white animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Enhance My Prompt
        </button>
      </div>
    </section>
  );
}
