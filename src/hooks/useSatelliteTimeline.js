// ─── useSatelliteTimeline hook ───────────────────────────────────────────────

import { useState, useCallback } from "react";
import { getTimelineImages } from "../services/sentinelHub";

const DEFAULT_YEARS = [2017, 2019, 2021, 2023, 2024];

export function useSatelliteTimeline() {
  const [images,  setImages]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const loadTimeline = useCallback(async ({ lat, lng, years = DEFAULT_YEARS }) => {
    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const results = await getTimelineImages({ lat, lng, years });
      setImages(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { images, loading, error, loadTimeline };
}
