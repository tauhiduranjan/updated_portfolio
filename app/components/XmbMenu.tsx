"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, type PortfolioItem } from "@/data/portfolio";
import DetailPanel from "./DetailPanel";

export default function XmbMenu() {
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("");
  const touchStart = useRef({ x: 0, y: 0 });
  const lastWheel = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeItem) return;
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

  // Mouse wheel scrolls through items
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (activeItem) return;
      const now = Date.now();
      if (now - lastWheel.current < 150) return; // throttle
      lastWheel.current = now;
      const max = CATEGORIES[catIdx].items.length - 1;
      if (e.deltaY > 0) setItemIdx((i) => Math.min(max, i + 1));
      else setItemIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [catIdx, activeItem]);

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

  // Responsive sizing
  const iconSize = isMobile ? 52 : 72;
  const iconGap  = isMobile ? 24 : 58;
  const cardW    = iconSize + iconGap; // center-to-center distance
  const gridTransform = `translateX(${-catIdx * cardW}px)`;

  // Items list top offset — smaller gap on mobile since icons are smaller
  const itemsTopOffset = isMobile ? 60 : 88;
  const itemsMaxH = isMobile ? "min(42vh, 280px)" : "min(330px, calc(50vh - 120px))";

  return (
    <div
      ref={rootRef}
      style={{ position: "absolute", inset: 0, zIndex: 2 }}
      onTouchStart={(e) => {
        if (activeItem) return;
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (activeItem) return;
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          handleNav(dx < 0 ? "right" : "left");
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 40) {
          handleNav(dy < 0 ? "down" : "up");
        }
      }}
    >
      {/* Top-left user pill */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 18,
          fontSize: isMobile ? 12 : 13,
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
        {isMobile ? "Tauhidur" : "Tauhidur Anjan"}
      </div>

      {/* Top-right clock */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          fontSize: isMobile ? 12 : 13,
          fontWeight: 500,
          letterSpacing: "0.5px",
          color: "var(--text-secondary)",
          zIndex: 5,
        }}
      >
        {clock}
      </div>

      {/* Category icon strip */}
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
            gap: iconGap,
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
                  width: iconSize,
                  height: iconSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: isMobile ? 8 : 12,
                  transition: "transform 0.3s ease",
                  transform: ci === catIdx ? "scale(1.18)" : "scale(1)",
                  color: "var(--text-primary)",
                }}
                dangerouslySetInnerHTML={{ __html: cat.icon }}
              />
              <div
                style={{
                  fontSize: isMobile ? 10 : 12,
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

      {/* Items list */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `calc(50% + ${itemsTopOffset}px)`,
          transform: "translateX(-50%)",
          width: "min(580px, calc(100vw - 32px))",
          maxHeight: itemsMaxH,
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
                  padding: isMobile ? "14px 16px" : "12px 18px",
                  borderRadius: 6,
                  opacity: isSel ? 1 : 0.6,
                  transition:
                    "opacity 0.35s cubic-bezier(0.22,0.61,0.36,1), background 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  background: isSel ? "var(--surface-overlay)" : "transparent",
                  boxShadow: isSel ? "inset 3px 0 0 var(--accent)" : "none",
                  minHeight: isMobile ? 60 : "auto",
                }}
              >
                <div
                  style={{
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isSel ? "var(--accent)" : "var(--text-secondary)",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: isMobile ? 14 : 15,
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.t}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      letterSpacing: "0.4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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

      {/* Keyboard hint — hidden on mobile via CSS */}
      <div
        className="xmb-keyboard-hint"
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
        ← → categories &nbsp;&nbsp; ↑ ↓ / scroll items &nbsp;&nbsp; enter select &nbsp;&nbsp; esc back
      </div>

      {/* Mobile swipe hint — only visible on mobile */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.6px",
            zIndex: 5,
          }}
        >
          swipe left/right · tap to open
        </div>
      )}

      {/* On-screen nav controls */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? 36 : 38,
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
