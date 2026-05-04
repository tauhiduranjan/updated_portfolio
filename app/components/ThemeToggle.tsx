"use client";

import { ICONS } from "@/data/icons";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        position: "absolute",
        bottom: 14,
        left: 18,
        width: 32,
        height: 32,
        background: "var(--surface-overlay)",
        border: "0.5px solid var(--surface-border)",
        borderRadius: 6,
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 6,
        padding: 0,
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface-overlay)";
      }}
    >
      <div
        style={{ width: 16, height: 16 }}
        dangerouslySetInnerHTML={{
          __html: theme === "dark" ? ICONS.sun : ICONS.moon,
        }}
      />
    </button>
  );
}
