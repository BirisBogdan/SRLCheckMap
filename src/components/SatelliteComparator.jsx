// ─── SatelliteComparator.jsx ─────────────────────────────────────────────────
// Componenta principala: slider stanga/dreapta + timeline ani

import { useState, useRef, useEffect, useCallback } from "react";

const PROGRESS_BY_YEAR = {
  2017: 0, 2018: 10, 2019: 20, 2020: 35,
  2021: 50, 2022: 65, 2023: 80, 2024: 100,
};

export default function SatelliteComparator({ images, loading }) {
  const [sliderPct,    setSliderPct]    = useState(50);
  const [selectedIdx,  setSelectedIdx]  = useState(0);
  const [isDragging,   setIsDragging]   = useState(false);
  const containerRef   = useRef(null);

  const currentImage = images[selectedIdx];
  const latestImage  = images[images.length - 1];

  // ── Drag logic ──────────────────────────────────────────────────────────
  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPct(pct);
  }, []);

  useEffect(() => {
    const onMove = (e) => isDragging && handleMove(e.clientX);
    const onTouchMove = (e) => isDragging && handleMove(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("touchend",  onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("touchend",  onUp);
    };
  }, [isDragging, handleMove]);

  const progress = currentImage ? (PROGRESS_BY_YEAR[currentImage.year] ?? 0) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Harta comparator ── */}
      <div
        ref={containerRef}
        style={{
          position:     "relative",
          width:        "100%",
          height:       420,
          borderRadius: 12,
          border:       "1px solid #e2e2e2",
          overflow:     "hidden",
          background:   "#1a1a2e",
          cursor:       "ew-resize",
        }}
      >
        {/* Loading overlay */}
        {loading && (
          <div style={styles.overlay}>
            <div style={styles.spinner} />
            <span style={{ color: "#aaa", fontSize: 14 }}>Se încarcă imaginile satelitare...</span>
          </div>
        )}

        {/* Imaginea "prezent" (dreapta) */}
        {latestImage?.url && (
          <img
            src={latestImage.url}
            alt="Imagine curentă"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {/* Imaginea "trecut" (stanga) cu clip */}
        {currentImage?.url && (
          <img
            src={currentImage.url}
            alt={`Imagine ${currentImage.year}`}
            style={{
              position:  "absolute", inset: 0,
              width:     "100%",     height: "100%",
              objectFit: "cover",
              clipPath:  `inset(0 ${100 - sliderPct}% 0 0)`,
            }}
          />
        )}

        {/* Linie divider */}
        <div style={{ ...styles.dividerLine, left: `${sliderPct}%` }} />

        {/* Knob drag */}
        <div
          style={{ ...styles.knob, left: `${sliderPct}%` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          ⟺
        </div>

        {/* Badge-uri an */}
        <div style={styles.badgeLeft}>{currentImage?.year ?? "—"}</div>
        <div style={styles.badgeRight}>2024</div>

        {/* Mesaj no data */}
        {!loading && images.length === 0 && (
          <div style={styles.overlay}>
            <span style={{ color: "#aaa", fontSize: 14 }}>
              Introdu o adresă și apasă Caută
            </span>
          </div>
        )}
      </div>

      {/* ── Timeline butoane ani ── */}
      {images.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {images.map((img, i) => (
            <button
              key={img.year}
              onClick={() => setSelectedIdx(i)}
              style={{
                padding:      "6px 14px",
                borderRadius: 20,
                border:       `1.5px solid ${i === selectedIdx ? "#1D9E75" : "#e0e0e0"}`,
                background:   i === selectedIdx ? "#e8f8f3" : "white",
                color:        i === selectedIdx ? "#0F6E56" : "#555",
                fontWeight:   i === selectedIdx ? 600 : 400,
                cursor:       "pointer",
                fontSize:     13,
              }}
            >
              {img.year}
              {img.error && " ⚠"}
            </button>
          ))}
        </div>
      )}

      {/* ── Bara progres ── */}
      {images.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
            Progres estimat construcție ({currentImage?.year} → 2024)
          </div>
          <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height:     "100%",
                width:      `${progress}%`,
                background: "#1D9E75",
                borderRadius: 4,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa", marginTop: 4 }}>
            <span>Teren liber</span>
            <span>{progress}% finalizat</span>
            <span>Complet</span>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position:       "absolute", inset: 0,
    background:     "rgba(20,20,30,0.85)",
    display:        "flex", flexDirection: "column",
    alignItems:     "center", justifyContent: "center",
    gap:            12, zIndex: 10,
  },
  spinner: {
    width:       28,  height:      28,
    border:      "3px solid #333",
    borderTopColor: "#1D9E75",
    borderRadius: "50%",
    animation:   "spin 0.8s linear infinite",
  },
  dividerLine: {
    position:  "absolute", top: 0, bottom: 0,
    width:     2, background: "white",
    transform: "translateX(-50%)",
    pointerEvents: "none", zIndex: 5,
  },
  knob: {
    position:   "absolute", top: "50%",
    transform:  "translate(-50%, -50%)",
    width:      36,  height:  36,
    background: "white", borderRadius: "50%",
    border:     "2px solid rgba(0,0,0,0.2)",
    display:    "flex", alignItems: "center", justifyContent: "center",
    fontSize:   13, cursor: "ew-resize",
    zIndex:     6, userSelect: "none",
  },
  badgeLeft: {
    position:   "absolute", top: 10, left: 10,
    background: "rgba(0,0,0,0.6)", color: "white",
    fontSize:   12, padding: "3px 10px", borderRadius: 20,
    pointerEvents: "none", zIndex: 7,
  },
  badgeRight: {
    position:   "absolute", top: 10, right: 10,
    background: "rgba(0,0,0,0.6)", color: "white",
    fontSize:   12, padding: "3px 10px", borderRadius: 20,
    pointerEvents: "none", zIndex: 7,
  },
};
