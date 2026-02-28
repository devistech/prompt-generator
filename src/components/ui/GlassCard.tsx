import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function GlassCard({ children, className = "", padding = "md" }: GlassCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  return (
    <div className={`glass-card ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
