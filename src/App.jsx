// ─── App.jsx ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useGeocode } from "./hooks/useGeocode";
import { useSatelliteTimeline } from "./hooks/useSatelliteTimeline";
import SatelliteComparator from "./components/SatelliteComparator";

const YEARS = [2017, 2019, 2021, 2023, 2024];

export default function App() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  const { geocode, loading: geoLoading, error: geoError } = useGeocode();
  const { images, loading: imgLoading, error: imgError, loadTimeline } = useSatelliteTimeline();

  async function handleSearch(e) {
    e.preventDefault();
    const coords = await geocode(address);
    if (!coords) return;
    setLocation(coords);
    await loadTimeline({ lat: coords.lat, lng: coords.lng, years: YEARS });
  }

  const isLoading = geoLoading || imgLoading;
  const error = geoError || imgError;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#111" }}>
          ImoCheck <span style={{ color: "#1D9E75" }}>Satelit</span>
        </h1>
        <p style={{ color: "#888", fontSize: 14, margin: "4px 0 0" }}>
          Verifică istoricul satelitar al oricărei locații din România
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ex: Strada Sopor 5, Cluj-Napoca"
          style={{
            flex: 1, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #ddd",
            fontSize: 15, outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          style={{
            padding: "10px 20px",
            background: isLoading ? "#ccc" : "#1D9E75",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 15,
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {isLoading ? "Se caută..." : "Caută"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}

      {/* Location found */}
      {location && (
        <div style={{ fontSize: 12, color: "#888", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <span>📍</span>
          <span>{location.displayName}</span>
        </div>
      )}

      {/* Comparator */}
      <SatelliteComparator images={images} loading={isLoading} />

      {/* Footer note */}
      <p style={{ fontSize: 12, color: "#bbb", marginTop: 20, textAlign: "center" }}>
        Imagini furnizate de Sentinel Hub (ESA Copernicus) · Rezoluție 10m
      </p>

    </div>
  );
}
