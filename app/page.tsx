"use client";

import { useEffect, useState } from "react";
import WaveBackground from "@/components/WaveBackground";
import XmbMenu from "@/components/XmbMenu";
import ThemeToggle from "@/components/ThemeToggle";
import PS2Boot from "@/components/PS2Boot";
import CustomCursor from "@/components/CustomCursor";

type Theme = "dark" | "light";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("xmb-theme") as Theme | null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("xmb-theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-mid)",
      }}
    >
      <WaveBackground theme={theme} />
      <ThemeToggle theme={theme} onToggle={toggle} />
      <XmbMenu />
      {!started && <PS2Boot onComplete={() => setStarted(true)} />}
      <CustomCursor />
    </main>
  );
}
