"use client";

import { useState, useCallback } from "react";
import { AppState, OptimizedPrompt, AnalysisResult } from "@/types";

export function usePromptForge() {
  const [state, setState] = useState<AppState>("IDLE");
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [optimizedPrompt, setOptimizedPrompt] = useState<OptimizedPrompt | null>(null);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const showInput = state === "IDLE" || state === "PROCESSING";
  const showClarify = state === "CLARIFY";
  const showOutput = state === "OUTPUT";
  const loading = state === "PROCESSING";

  const callApi = async (prompt: string, questions?: string[], answers?: string[]) => {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, questions, answers }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze prompt");
    }

    return response.json() as Promise<AnalysisResult>;
  };

  const handleInitialSubmit = useCallback(async () => {
    if (!prompt.trim()) return;

    setState("PROCESSING");
    setError(null);

    try {
      const result = await callApi(prompt);

      if (result.needsClarification && result.questions.length > 0) {
        setQuestions(result.questions);
        setState("CLARIFY");
      } else if (result.optimizedPrompt) {
        setOptimizedPrompt(result.optimizedPrompt);
        setExplanation(result.explanation || "This version provides a clear role, specific objectives, required context, and well-defined output format for better AI responses.");
        setState("OUTPUT");
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setState("IDLE");
    }
  }, [prompt]);

  const handleClarifySubmit = useCallback(async (answers: string[]) => {
    setState("PROCESSING");
    setError(null);

    try {
      const result = await callApi(prompt, questions, answers);

      if (result.optimizedPrompt) {
        setOptimizedPrompt(result.optimizedPrompt);
        setExplanation(result.explanation || "This version provides a clear role, specific objectives, required context, and well-defined output format for better AI responses.");
        setState("OUTPUT");
      } else {
        throw new Error("Failed to generate optimized prompt");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setState("CLARIFY");
    }
  }, [prompt, questions]);

  const reset = useCallback(() => {
    setState("IDLE");
    setPrompt("");
    setQuestions([]);
    setOptimizedPrompt(null);
    setExplanation("");
    setError(null);
  }, []);

  const scrollToInput = useCallback(() => {
    const input = document.getElementById("prompt-input");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  }, []);

  return {
    state,
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
  };
}
