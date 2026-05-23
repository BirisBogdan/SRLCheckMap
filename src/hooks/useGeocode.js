// ─── useGeocode hook ─────────────────────────────────────────────────────────
// Transforma o adresa text in coordonate lat/lng folosind Nominatim (gratuit)

import { useState } from "react";

export function useGeocode() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function geocode(address) {
        setLoading(true);
        setError(null);
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
            const res = await fetch(url, { headers: { "Accept-Language": "ro,en" } });
            const data = await res.json();

            if (!data || data.length === 0) {
                throw new Error("Adresa nu a fost găsită. Încearcă mai specific.");
            }

            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                displayName: data[0].display_name,
            };
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { geocode, loading, error };
}
