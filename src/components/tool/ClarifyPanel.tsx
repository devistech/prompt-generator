"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";

interface ClarifyPanelProps {
  questions: string[];
  onSubmit: (answers: string[]) => void;
  loading: boolean;
  show: boolean;
}

export function ClarifyPanel({ questions, onSubmit, loading, show }: ClarifyPanelProps) {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  if (!show || questions.length === 0) return null;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <GlassCard className="max-w-[960px] mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[var(--accent-secondary)]">⚡</span>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            I need a few clarifications
          </h3>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index}>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">
                <span className="text-[var(--accent-primary)] font-semibold">
                  {index + 1}.
                </span>{" "}
                {question}
              </label>
              <textarea
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Your answer..."
                className="w-full h-[80px] bg-[var(--glass)] border border-[var(--glass-border)] rounded-lg p-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-200 resize-none text-sm"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={answers.some((a) => !a.trim())}
            size="lg"
          >
            Submit Answers
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
