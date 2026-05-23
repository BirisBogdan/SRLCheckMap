import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json());

const SH_BASE = "https://services.sentinel-hub.com";
const CLIENT_ID = process.env.VITE_SH_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_SH_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiry = 0;

async function getToken() {
    if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

    const res = await fetch(`${SH_BASE}/auth/realms/main/protocol/openid-connect/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    });

    if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`);
    const data = await res.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return cachedToken;
}

// Endpoint: POST /satellite-image
app.post("/satellite-image", async (req, res) => {
    try {
        const { lat, lng, year } = req.body;
        const token = await getToken();

        const delta = 0.03;
        const bbox = [lng - delta, lat - delta, lng + delta, lat + delta];
        const dateFrom = `${year}-04-01T00:00:00Z`;
        const dateTo = `${year}-10-30T23:59:59Z`;

        const body = {
            input: {
                bounds: { bbox, properties: { crs: "http://www.opengis.net/def/crs/EPSG/0/4326" } },
                data: [{
                    type: "sentinel-2-l2a",
                    dataFilter: {
                        timeRange: { from: dateFrom, to: dateTo },
                        maxCloudCoverage: 15,
                        mosaickingOrder: "leastCC",
                    },
                }],
            },
            output: {
                width: 600, height: 600,
                responses: [{ identifier: "default", format: { type: "image/jpeg", quality: 90 } }],
            },
            evalscript: `
        //VERSION=3
        function setup() {
          return { input: [{ bands: ["B04","B03","B02"], units: "REFLECTANCE" }], output: { bands: 3, sampleType: "UINT8" } };
        }
        function evaluatePixel(s) {
          const gain = 3.8;
          return [Math.min(255, s.B04*gain*255), Math.min(255, s.B03*gain*255), Math.min(255, s.B02*gain*255)];
        }
      `,
        };

        const shRes = await fetch(`${SH_BASE}/api/v1/process`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "image/jpeg" },
            body: JSON.stringify(body),
        });

        if (!shRes.ok) {
            const err = await shRes.text();
            return res.status(shRes.status).json({ error: err });
        }

        const buffer = await shRes.arrayBuffer();
        res.set("Content-Type", "image/jpeg");
        res.send(Buffer.from(buffer));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => console.log("Backend pornit pe http://localhost:3001"));