import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import { cropRecs, alerts, market } from './mockData.js';
import { latency, nowIso, requireApiKey } from './utils.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, time: nowIso() });
});

// Protected API routes
app.use(requireApiKey);

app.post('/recommendations', async (_req, res) => {
  await latency();
  res.json({ data: cropRecs, lastUpdated: nowIso() });
});

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function inferCondition(rainProb, tempC) {
  if (rainProb >= 0.6) return 'Rain';
  if (rainProb >= 0.25) return 'Cloudy';
  if (tempC <= 6) return 'Fog';
  return 'Sunny';
}

function buildAlertsFromForecast(days) {
  const out = [];

  const hottest = days.reduce((m, d) => (d.tempC > m.tempC ? d : m), days[0]);
  if (hottest && hottest.tempC >= 40) {
    out.push({
      id: 'heatwave',
      type: 'Heatwave',
      severity: hottest.tempC >= 44 ? 'High' : 'Medium',
      message: `High temperatures expected (peak ~${Math.round(hottest.tempC)}°C).`,
      suggestions: ['Irrigate early morning', 'Mulch to reduce evaporation', 'Avoid fertilizer during peak heat'],
    });
  }

  const wet = days.find((d) => d.rainProb >= 0.75);
  if (wet) {
    out.push({
      id: 'heavy-rain',
      type: 'Heavy Rain',
      severity: 'Medium',
      message: 'High rainfall probability detected in the coming days.',
      suggestions: ['Ensure drainage channels', 'Delay pesticide spray by 24h after rain'],
    });
  }

  if (!out.length) {
    // fallback: keep demo alerts minimal
    out.push(...alerts);
  }

  return out;
}

function formatGeoLabel(hit) {
  if (!hit) return null;
  const parts = [hit.name, hit.admin1, hit.country].filter(Boolean);
  return parts.join(', ');
}

async function geocodeLocation(name) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.set('name', name);
  url.searchParams.set('count', '1');
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
  const json = await res.json();
  const hit = json?.results?.[0];
  if (!hit) return null;
  return {
    latitude: hit.latitude,
    longitude: hit.longitude,
    label: formatGeoLabel(hit) ?? `${hit.latitude},${hit.longitude}`,
  };
}

async function reverseGeocodeOnce(latitude, longitude) {
  // Open-Meteo has forward geocoding, but no public reverse-geocoding endpoint.
  // For demo UX, use OpenStreetMap Nominatim reverse (no API key required).
  const url = new URL('https://nominatim.openstreetmap.org/reverse');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('lat', String(latitude));
  url.searchParams.set('lon', String(longitude));
  url.searchParams.set('zoom', '10');

  const res = await fetch(url, {
    headers: {
      // Nominatim requires a valid User-Agent identifying the app.
      'user-agent': 'smart-crop-advisor-demo/0.1 (demo prototype)',
      accept: 'application/json',
    },
  });

  if (!res.ok) return null;
  const json = await res.json();
  const address = json?.address;
  if (!address) return null;

  const name =
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    address.state_district ||
    address.state ||
    null;

  const parts = [name, address.state, address.country].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

async function reverseGeocode(latitude, longitude) {
  // Some coordinates (especially in dense cities) may not resolve to a named hit.
  // For demo UX, try a few tiny offsets to find the nearest populated place.
  const deltas = [
    [0, 0],
    [0.02, 0],
    [-0.02, 0],
    [0, 0.02],
    [0, -0.02],
    [0.02, 0.02],
    [-0.02, -0.02],
  ];

  for (const [dLat, dLon] of deltas) {
    const label = await reverseGeocodeOnce(latitude + dLat, longitude + dLon);
    if (label) return label;
  }

  return null;
}

app.get('/weather', async (req, res) => {
  // Demo-realistic weather via Open-Meteo (no API key required from provider).
  // Inputs:
  // - latitude, longitude (recommended)
  // - location (string, will be geocoded)
  try {
    const q = req.query;
    let latitude = q.latitude ? Number(q.latitude) : undefined;
    let longitude = q.longitude ? Number(q.longitude) : undefined;
    let place = null;

    if ((!latitude || !longitude) && typeof q.location === 'string' && q.location.trim()) {
      const geo = await geocodeLocation(q.location.trim());
      if (geo) {
        latitude = geo.latitude;
        longitude = geo.longitude;
        place = geo.label;
      }
    }

    // Default (if no inputs): New Delhi area.
    if (!latitude || !longitude) {
      latitude = 28.6139;
      longitude = 77.209;
      place = place ?? 'New Delhi, India';
    }

    // If we have coords but no label yet (e.g. browser geolocation), reverse geocode.
    if (!place) {
      place = (await reverseGeocode(latitude, longitude)) ?? `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
    }

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(latitude));
    url.searchParams.set('longitude', String(longitude));
    url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_probability_max');
    url.searchParams.set('timezone', 'auto');

    const meteoRes = await fetch(url);
    if (!meteoRes.ok) {
      return res.status(502).json({ error: `Weather provider error (${meteoRes.status})` });
    }

    const json = await meteoRes.json();
    const daily = json?.daily;
    const times = daily?.time ?? [];
    const tMax = daily?.temperature_2m_max ?? [];
    const tMin = daily?.temperature_2m_min ?? [];
    const rainMax = daily?.precipitation_probability_max ?? [];

    const days = times.slice(0, 7).map((date, i) => {
      const maxC = Number(tMax[i]);
      const minC = Number(tMin[i]);
      const tempC = Number.isFinite(maxC) && Number.isFinite(minC) ? (maxC + minC) / 2 : Number.isFinite(maxC) ? maxC : 0;
      const rainProb = clamp01((Number(rainMax[i]) || 0) / 100);
      return {
        date,
        condition: inferCondition(rainProb, tempC),
        tempC: Math.round(tempC),
        rainProb,
      };
    });

    const computedAlerts = buildAlertsFromForecast(days);

    return res.json({
      data: { days, alerts: computedAlerts },
      location: { latitude, longitude, place },
      lastUpdated: nowIso(),
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Failed to load weather' });
  }
});

app.post('/soil', async (_req, res) => {
  await latency();
  res.json({
    data: {
      status: { n: 'Low', p: 'Optimal', k: 'Low', ph: 'Optimal' },
      recommendations: [
        {
          title: 'Urea (Nitrogen)',
          dosage: '35–45 kg/acre (split doses)',
          timing: 'Basal + 30 days after sowing',
          costHint: 'Medium cost; split improves efficiency',
        },
        {
          title: 'MOP (Potassium)',
          dosage: '10–15 kg/acre',
          timing: 'Basal application',
          costHint: 'Low cost; improves stress tolerance',
        },
      ],
      organicAlternatives: ['Farmyard manure 1–2 tons/acre', 'Compost + neem cake blend'],
    },
    lastUpdated: nowIso(),
  });
});

app.post('/pest-diagnose', async (req, res) => {
  await latency(900, 1500);
  const fileName = req.body?.fileName;
  if (!fileName) return res.status(400).json({ error: 'fileName is required' });

  res.json({
    data: {
      issue: 'Leaf spot (possible fungal)',
      severity: 'Medium',
      organic: ['Remove heavily infected leaves', 'Spray neem oil solution (1–2%)'],
      chemical: ['Mancozeb as per label', 'Copper-based fungicide as per label'],
      dosageTiming: 'Apply in the evening; repeat after 7–10 days if needed.',
    },
    lastUpdated: nowIso(),
  });
});

app.get('/market', async (_req, res) => {
  await latency();
  res.json({ data: market, lastUpdated: nowIso() });
});

const port = Number(process.env.PORT || 4000);

// Only listen if run directly (not requested by Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[backend] listening on http://localhost:${port}`);
  });
}

export default app;
