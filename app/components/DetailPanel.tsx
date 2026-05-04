"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "@/data/portfolio";

interface DetailPanelProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

function MusicPlayer({ tracks }: { tracks: NonNullable<PortfolioItem["tracks"]> }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  function select(idx: number) {
    if (activeIdx === idx) {
      toggle();
      return;
    }
    setActiveIdx(idx);
    setPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
    }, 0);
  }

  function toggle() {
    if (!audioRef.current || activeIdx === null) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  function onEnded() {
    setPlaying(false);
  }

  const activeTrack = activeIdx !== null ? tracks[activeIdx] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* track list */}
      {tracks.map((track, i) => (
        <button
          key={track.src}
          onClick={() => select(i)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: activeIdx === i ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
            border: `0.5px solid ${activeIdx === i ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 5,
            padding: "10px 14px",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
            color: activeIdx === i ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: 13,
            transition: "background 0.15s, border-color 0.15s",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 15, minWidth: 18, textAlign: "center" }}>
            {activeIdx === i && playing ? "▮▮" : "▶"}
          </span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {track.title}
          </span>
        </button>
      ))}

      {/* controls bar — only when a track is selected */}
      {activeTrack && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 6,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: 5,
          }}
        >
          <button
            onClick={toggle}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "0.5px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              color: "var(--text-primary)",
              width: 32,
              height: 32,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "▮▮" : "▶"}
          </button>

          <span
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activeTrack.title}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>vol</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{ width: 72, accentColor: "var(--text-primary)", cursor: "pointer" }}
              aria-label="Volume"
            />
          </div>
        </div>
      )}

      {/* hidden audio element */}
      {activeTrack && (
        <audio
          key={activeTrack.src}
          ref={audioRef}
          src={activeTrack.src}
          onEnded={onEnded}
          preload="auto"
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}

export default function DetailPanel({ item, onClose }: DetailPanelProps) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--detail-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        padding: "clamp(18px, 5vw, 40px) clamp(18px, 6vw, 40px)",
        overflowY: "auto",
        animation: "xmbFade 0.3s ease",
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: "flex-start",
          background: "var(--surface-overlay)",
          border: "0.5px solid var(--surface-border)",
          color: "var(--text-primary)",
          padding: "6px 14px",
          borderRadius: 4,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
          marginBottom: 18,
        }}
      >
        ◀ back
      </button>
      <h3
        style={{
          fontSize: 22,
          fontWeight: 500,
          margin: "0 0 4px",
          color: "var(--text-primary)",
        }}
      >
        {item.t}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          margin: "0 0 22px",
          letterSpacing: "0.4px",
        }}
      >
        {item.s}
      </p>

      {item.tracks ? (
        <MusicPlayer tracks={item.tracks} />
      ) : (
        <div
          className="xmb-detail-body"
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      )}
    </div>
  );
}
