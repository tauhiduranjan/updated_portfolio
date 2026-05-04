"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, type PortfolioItem } from "@/data/portfolio";
import DetailPanel from "./DetailPanel";

export default function XmbMenu() {
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("");

  // Live clock in the top-right
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const day = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setClock(`${day}  ${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Keyboard navigation — arrows for nav, Enter to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeItem) return; // detail panel handles its own keys
      const max = CATEGORIES[catIdx].items.length - 1;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCatIdx((c) => (c - 1 + CATEGORIES.length) % CATEGORIES.length);
        setItemIdx(0);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCatIdx((c) => (c + 1) % CATEGORIES.length);
        setItemIdx(0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setItemIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setItemIdx((i) => Math.min(max, i + 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        setActiveItem(CATEGORIES[catIdx].items[itemIdx]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [catIdx, itemIdx, activeItem]);

  const handleNav = (dir: "left" | "right" | "up" | "down" | "enter") => {
    const max = CATEGORIES[catIdx].items.length - 1;
    if (dir === "left") {
      setCatIdx((c) => (c - 1 + CATEGORIES.length) % CATEGORIES.length);
      setItemIdx(0);
    } else if (dir === "right") {
      setCatIdx((c) => (c + 1) % CATEGORIES.length);
      setItemIdx(0);
    } else if (dir === "up") {
      setItemIdx((i) => Math.max(0, i - 1));
    } else if (dir === "down") {
      setItemIdx((i) => Math.min(max, i + 1));
    } else if (dir === "enter") {
      setActiveItem(CATEGORIES[catIdx].items[itemIdx]);
    }
  };

  // Center the active category by translating the icon strip
  const cardW = 130;
  const gridTransform = `translateX(${-catIdx * cardW}px)`;

  return (
    <div ref={rootRef} style={{ position: "absolute", inset: 0, zIndex: 2 }}>
      {/* Top-left user pill */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 18,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.5px",
          color: "var(--text-secondary)",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 500,
            color: "#0a1628",
          }}
        >
          T
        </div>
        Tauhidur Anjan
      </div>

      {/* Top-right clock */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.5px",
          color: "var(--text-secondary)",
          zIndex: 5,
        }}
      >
        {clock}
      </div>

      {/* Stage with category icons */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 58,
            alignItems: "center",
            transition: "transform 0.45s cubic-bezier(0.22,0.61,0.36,1)",
            transform: gridTransform,
          }}
        >
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.id}
              onClick={() => {
                setCatIdx(ci);
                setItemIdx(0);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                opacity: ci === catIdx ? 1 : 0.45,
                transition: "opacity 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  transition: "transform 0.3s ease",
                  transform: ci === catIdx ? "scale(1.18)" : "scale(1)",
                  color: "var(--text-primary)",
                }}
                dangerouslySetInnerHTML={{ __html: cat.icon }}
              />
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                  height: 16,
                  opacity: ci === catIdx ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {cat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items list — outer div clips, inner div slides to keep selection visible */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "calc(50% + 88px)",
          transform: "translateX(-50%)",
          width: 580,
          maxHeight: "min(330px, calc(50vh - 120px))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            transform: `translateY(${-Math.max(0, itemIdx - 2) * 60}px)`,
            transition: "transform 0.35s cubic-bezier(0.22,0.61,0.36,1)",
          }}
        >
        {CATEGORIES[catIdx].items.map((item, ii) => {
          const isSel = ii === itemIdx;
          return (
            <div
              key={ii}
              onClick={() => {
                setItemIdx(ii);
                setActiveItem(item);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 18px",
                borderRadius: 6,
                opacity: isSel ? 1 : 0.6,
                transition:
                  "opacity 0.35s cubic-bezier(0.22,0.61,0.36,1), background 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
                background: isSel ? "var(--surface-overlay)" : "transparent",
                boxShadow: isSel ? "inset 3px 0 0 var(--accent)" : "none",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isSel ? "var(--accent)" : "var(--text-secondary)",
                }}
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.t}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    letterSpacing: "0.4px",
                  }}
                >
                  {item.s}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* On-screen control hint */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 12,
          color: "var(--text-muted)",
          letterSpacing: "0.8px",
          zIndex: 5,
        }}
      >
        ← → navigate categories &nbsp;&nbsp; ↑ ↓ navigate items &nbsp;&nbsp;
        enter / click select
      </div>

      {/* Mobile / accessibility controls */}
      <div
        style={{
          position: "absolute",
          bottom: 38,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 6,
          zIndex: 5,
        }}
      >
        {(["left", "up", "down", "right"] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => handleNav(dir)}
            aria-label={dir}
            className="xmb-control-btn"
          >
            {dir === "left" ? "◀" : dir === "right" ? "▶" : dir === "up" ? "▲" : "▼"}
          </button>
        ))}
        <button
          onClick={() => handleNav("enter")}
          className="xmb-control-btn"
          style={{ width: "auto", padding: "0 14px" }}
          aria-label="enter"
        >
          enter
        </button>
      </div>

      <DetailPanel item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
