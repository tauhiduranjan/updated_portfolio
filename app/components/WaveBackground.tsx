"use client";

import { useEffect, useRef } from "react";

interface WaveBackgroundProps {
  theme: "dark" | "light";
}

export default function WaveBackground({ theme }: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);

  // Keep the latest theme value accessible inside the animation loop
  // without restarting it.
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;

      const isDark = themeRef.current === "dark";
      const palette = isDark
        ? {
            bgStart: "#0a1628",
            bgMid: "#0d2440",
            bgEnd: "#0a1628",
            fillBase: [74, 176, 232],
            strokeBase: [124, 196, 236],
          }
        : {
            bgStart: "#e8f1f8",
            bgMid: "#f5f9fc",
            bgEnd: "#dde8f2",
            fillBase: [26, 111, 176],
            strokeBase: [74, 144, 196],
          };

      // Vertical gradient background
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, palette.bgStart);
      g.addColorStop(0.5, palette.bgMid);
      g.addColorStop(1, palette.bgEnd);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Filled wave layers (the "ribbon" feel)
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const amp = 28 + i * 8;
        const freq = 0.005 + i * 0.001;
        const phase = t * 0.0008 + i * 0.7;
        const baseY = h * (0.35 + i * 0.12);
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 6) {
          const y =
            baseY +
            Math.sin(x * freq + phase) * amp +
            Math.sin(x * freq * 2.2 + phase * 1.3) * (amp * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        const [r, gC, b] = palette.fillBase;
        const alpha = isDark ? 0.04 + i * 0.02 : 0.05 + i * 0.025;
        ctx.fillStyle = `rgba(${r}, ${gC}, ${b}, ${alpha})`;
        ctx.fill();
      }

      // Stroked wave lines
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const amp = 18 + i * 6;
        const freq = 0.008 + i * 0.001;
        const phase = -t * 0.0012 + i * 1.1;
        const baseY = h * (0.25 + i * 0.15);
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 6) {
          const y = baseY + Math.sin(x * freq + phase) * amp;
          ctx.lineTo(x, y);
        }
        const [r, gC, b] = palette.strokeBase;
        const alpha = isDark ? 0.08 + i * 0.015 : 0.1 + i * 0.02;
        ctx.strokeStyle = `rgba(${r}, ${gC}, ${b}, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      t += 16;
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
