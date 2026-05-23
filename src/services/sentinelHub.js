export async function getSatelliteImage({ lat, lng, year }) {
    const res = await fetch("http://localhost:3001/satellite-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, year }),
    });
    if (!res.ok) throw new Error(`Eroare server: ${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}

export async function getTimelineImages({ lat, lng, years = [2018, 2020, 2022, 2023, 2024] }) {
    const results = await Promise.allSettled(
        years.map((year) => getSatelliteImage({ lat, lng, year }))
    );
    return years.map((year, i) => ({
        year,
        url: results[i].status === "fulfilled" ? results[i].value : null,
        error: results[i].status === "rejected" ? results[i].reason?.message : null,
    }));
}