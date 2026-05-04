"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const SIZE = 30;
  const cx = SIZE / 2;
  const r = cx - 1.5;

  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  const hourAngle  = ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30;
  const minuteAngle = (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const secondAngle = (time.getSeconds() / 60) * 360;

  const tip = (angle: number, len: number) => ({
    x: cx + Math.cos(toRad(angle)) * len,
    y: cx + Math.sin(toRad(angle)) * len,
  });

  const h = tip(hourAngle, r * 0.46);
  const m = tip(minuteAngle, r * 0.70);
  const s = tip(secondAngle, r * 0.80);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.12s ease",
      }}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Face */}
        <circle cx={cx} cy={cx} r={r} fill="rgba(4,8,18,0.82)" stroke="rgba(74,176,232,0.9)" strokeWidth="1" />
        {/* 12 tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = toRad((i / 12) * 360);
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * (r - 2.8)}
              y1={cx + Math.sin(a) * (r - 2.8)}
              x2={cx + Math.cos(a) * (r - 0.6)}
              y2={cx + Math.sin(a) * (r - 0.6)}
              stroke="rgba(74,176,232,0.45)"
              strokeWidth="0.7"
            />
          );
        })}
        {/* Hour hand */}
        <line x1={cx} y1={cx} x2={h.x} y2={h.y} stroke="rgba(255,255,255,0.95)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1={cx} y1={cx} x2={m.x} y2={m.y} stroke="rgba(255,255,255,0.85)" strokeWidth="1.1" strokeLinecap="round" />
        {/* Second hand */}
        <line x1={cx} y1={cx} x2={s.x} y2={s.y} stroke="#4ab0e8" strokeWidth="0.7" strokeLinecap="round" />
        {/* Center cap */}
        <circle cx={cx} cy={cx} r="1.6" fill="#4ab0e8" />
      </svg>
    </div>
  );
}
