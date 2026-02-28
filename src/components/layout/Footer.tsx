import React from "react";

export function Footer() {
  return (
    <footer className="w-full py-8 mt-16 border-t border-[var(--glass-border)]">
      <div className="max-w-[960px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent-primary)] font-semibold">PromptForge</span>
          <span className="text-[var(--text-muted)]">AI</span>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Free for all • No login • No storage
        </p>
      </div>
    </footer>
  );
}
