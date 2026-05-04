"use client";

import { useEffect, useState } from "react";

const BLOCKS = [
  { x: -130, w: 22, h: 36, color: "#4ab0e8", dur: 2.4, delay: 0 },
  { x: -90,  w: 18, h: 52, color: "#6b8cff", dur: 2.1, delay: 0.3 },
  { x: -50,  w: 24, h: 28, color: "#3a9fd8", dur: 2.7, delay: 0.1 },
  { x: -10,  w: 20, h: 44, color: "#5cc0f0", dur: 2.3, delay: 0.5 },
  { x: 30,   w: 22, h: 38, color: "#7b6fff", dur: 2.5, delay: 0.2 },
  { x: 70,   w: 18, h: 60, color: "#4ab0e8", dur: 2.0, delay: 0.4 },
  { x: 110,  w: 24, h: 32, color: "#3a9fd8", dur: 2.6, delay: 0.15 },
];

type Phase = "boot" | "logo" | "start" | "exit";

export default function PS2Boot({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 2100);
    const t2 = setTimeout(() => setPhase("start"), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== "start") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") doExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const doExit = () => {
    setPhase("exit");
    setOpacity(0);
    setTimeout(onComplete, 900);
  };

  return (
    <div
      onClick={phase === "start" ? doExit : undefined}
      style={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, #06060f 0%, #000 75%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transition: "opacity 0.9s ease",
        overflow: "hidden",
      }}
    >
      {/* CRT scanlines */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Memory-card data blocks (boot phase) */}
      {phase === "boot" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", bottom: 0, left: "50%" }}>
            {BLOCKS.map((b, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: b.x,
                  width: b.w,
                  height: b.h,
                  background: `linear-gradient(to top, ${b.color}, rgba(200,235,255,0.75))`,
                  borderRadius: "2px 2px 0 0",
                  boxShadow: `0 0 10px ${b.color}, 0 0 22px ${b.color}55`,
                  animation: `ps2Rise ${b.dur}s ease-in ${b.delay}s forwards`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Logo */}
      {(phase === "logo" || phase === "start") && (
        <div style={{
          textAlign: "center",
          zIndex: 3,
          animation: "ps2FadeIn 0.7s ease forwards",
          marginBottom: 44,
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "5px",
            color: "rgba(255,255,255,0.38)",
            marginBottom: 14,
            fontFamily: "Arial, sans-serif",
            textTransform: "uppercase",
          }}>
            A PORTFOLIO WEBSITE
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
            <span style={{
              fontSize: 56,
              fontStyle: "italic",
              fontWeight: 900,
              fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif',
              color: "#ffffff",
              letterSpacing: "-1px",
              textShadow: "2px 2px 0 rgba(0,0,0,0.6)",
              lineHeight: 1,
            }}>
              Tauhidur Rahman 
            </span>
            <span style={{
              fontSize: 74,
              fontStyle: "italic",
              fontWeight: 900,
              fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif',
              color: "#4ab0e8",
              textShadow: "0 0 18px rgba(74,176,232,0.85), 0 0 40px rgba(74,176,232,0.4), 2px 2px 0 rgba(0,0,0,0.5)",
              marginLeft: 6,
              lineHeight: 1,
            }}>
              Anjan
            </span>
          </div>
          <div style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "1px",
            marginTop: 8,
            fontFamily: "Arial, sans-serif",
          }}>
            ® 2026 Tauhidur Rahman Anjan.
          </div>
        </div>
      )}

      {/* Press Start */}
      {phase === "start" && (
        <div style={{
          fontSize: 13,
          letterSpacing: "5px",
          color: "rgba(255,255,255,0.9)",
          fontFamily: '"Arial Black", Arial, sans-serif',
          textTransform: "uppercase",
          animation: "ps2Blink 1.15s linear infinite",
          zIndex: 3,
        }}>
          PRESS START
        </div>
      )}
    </div>
  );
}
