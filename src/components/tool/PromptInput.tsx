"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  show: boolean;
}

export function PromptInput({ value, onChange, onSubmit, loading, show }: PromptInputProps) {
  if (!show) return null;

  return (
    <div className="animate-fade-in">
      <GlassCard className="max-w-[960px] mx-auto">
        <label
          htmlFor="prompt-input"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-3"
        >
          Paste your raw coding prompt
        </label>
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your raw coding prompt here..."
          className="w-full h-[180px] md:h-[220px] bg-[var(--glass)] border border-[var(--glass-border)] rounded-xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-200 resize-none font-mono text-sm"
        />
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onSubmit}
            loading={loading}
            disabled={!value.trim()}
            size="lg"
          >
            Optimize Prompt
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
