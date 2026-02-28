"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { CopyButton } from "../ui/CopyButton";

interface OptimizedPrompt {
  role: string;
  objective: string;
  context: string;
  requirements: string[];
  outputFormat: string;
  constraints: string[];
}

interface OutputDisplayProps {
  prompt: OptimizedPrompt;
  explanation: string;
  show: boolean;
}

export function OutputDisplay({ prompt, explanation, show }: OutputDisplayProps) {
  if (!show) return null;

  const formatPrompt = () => {
    return `Role: ${prompt.role}
Objective: ${prompt.objective}
Context: ${prompt.context}
Requirements: ${prompt.requirements.join(", ")}
Output Format: ${prompt.outputFormat}
Constraints: ${prompt.constraints.join(", ")}`;
  };

  return (
    <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
      <GlassCard className="max-w-[960px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <span className="text-[var(--accent-primary)]">🔹</span>
            Optimized Prompt
          </h3>
          <CopyButton text={formatPrompt()} />
        </div>

        <div className="bg-[var(--ai-navy)] rounded-xl p-4 md:p-6 border border-[var(--glass-border)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
          <div className="space-y-4 font-mono text-sm">
            <div>
              <span className="text-[var(--accent-secondary)] font-semibold">Role:</span>
              <p className="text-[var(--text-primary)] mt-1">{prompt.role}</p>
            </div>
            <div>
              <span className="text-[var(--accent-secondary)] font-semibold">Objective:</span>
              <p className="text-[var(--text-primary)] mt-1">{prompt.objective}</p>
            </div>
            <div>
              <span className="text-[var(--accent-secondary)] font-semibold">Context:</span>
              <p className="text-[var(--text-primary)] mt-1">{prompt.context}</p>
            </div>
            <div>
              <span className="text-[var(--accent-secondary)] font-semibold">Requirements:</span>
              <ul className="text-[var(--text-primary)] mt-1 space-y-1">
                {prompt.requirements.map((req, i) => (
                  <li key={i} className="flex gap-2">
                    <span>•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[var(--accent-secondary)] font-semibold">Output Format:</span>
              <p className="text-[var(--text-primary)] mt-1">{prompt.outputFormat}</p>
            </div>
            <div>
              <span className="text-[var(--accent-secondary)] font-semibold">Constraints:</span>
              <ul className="text-[var(--text-primary)] mt-1 space-y-1">
                {prompt.constraints.map((constraint, i) => (
                  <li key={i} className="flex gap-2">
                    <span>•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
          <h4 className="text-md font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <span className="text-[#FBBF24]">✨</span>
            Why This Version Is Better
          </h4>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {explanation}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
