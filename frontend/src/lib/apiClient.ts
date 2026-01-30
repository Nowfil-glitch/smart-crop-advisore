import type {
  CropRecommendation,
  MarketPrice,
  PestDiagnosis,
  SoilGuidance,
  WeatherAlert,
  WeatherDay,
} from '@/lib/mockApi';

export type RecommendationsRequest = {
  location?: string;
  season?: 'kharif' | 'rabi' | 'zaid';
  soilType?: 'sandy' | 'loamy' | 'clayey';
  ph?: number;
  n?: number;
  p?: number;
  k?: number;
  rainfallMode?: 'use-weather' | 'manual';
  budget?: 'low' | 'medium' | 'high';
};

export type RecommendationsResponse = {
  data: CropRecommendation[];
  lastUpdated: string;
};

export type WeatherResponse = {
  data: { days: WeatherDay[]; alerts: WeatherAlert[] };
  location?: { latitude: number; longitude: number; place: string };
  lastUpdated: string;
};

export type MarketResponse = {
  data: MarketPrice[];
  lastUpdated: string;
};

export type SoilRequest = {
  n?: number;
  p?: number;
  k?: number;
  ph?: number;
};

export type SoilResponse = {
  data: SoilGuidance;
  lastUpdated: string;
};

export type PestDiagnoseResponse = {
  data: PestDiagnosis;
  lastUpdated: string;
};

function authHeaders(): Record<string, string> {
  // NOTE:
  // - On the client, ONLY variables prefixed with NEXT_PUBLIC_ are available.
  // - Set NEXT_PUBLIC_API_KEY in your environment to call protected endpoints.
  const key = process.env.NEXT_PUBLIC_API_KEY;
  return key ? { 'x-api-key': key } : {};
}

async function readError(res: Response) {
  const msg = await res.text().catch(() => '');
  return msg || res.statusText;
}

function backendBaseUrl() {
  // Configure the separate backend base URL.
  // Example: NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
  return (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '');
}

export async function fetchRecommendations(
  input: RecommendationsRequest = {}
): Promise<RecommendationsResponse> {
  const res = await fetch(`${backendBaseUrl()}/recommendations`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Recommendations API failed (${res.status}): ${await readError(res)}`);
  }

  return (await res.json()) as RecommendationsResponse;
}

export async function fetchWeather(input?: {
  latitude?: number;
  longitude?: number;
  location?: string;
}): Promise<WeatherResponse> {
  const url = new URL(`${backendBaseUrl()}/weather`);
  if (input?.latitude != null) url.searchParams.set('latitude', String(input.latitude));
  if (input?.longitude != null) url.searchParams.set('longitude', String(input.longitude));
  if (input?.location) url.searchParams.set('location', input.location);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(`Weather API failed (${res.status}): ${await readError(res)}`);
  }

  return (await res.json()) as WeatherResponse;
}

export async function fetchMarket(): Promise<MarketResponse> {
  const res = await fetch(`${backendBaseUrl()}/market`, {
    method: 'GET',
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(`Market API failed (${res.status}): ${await readError(res)}`);
  }

  return (await res.json()) as MarketResponse;
}

export async function fetchSoilGuidance(input: SoilRequest = {}): Promise<SoilResponse> {
  const res = await fetch(`${backendBaseUrl()}/soil`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Soil API failed (${res.status}): ${await readError(res)}`);
  }

  return (await res.json()) as SoilResponse;
}

export async function fetchPestDiagnosis(fileName: string): Promise<PestDiagnoseResponse> {
  const res = await fetch(`${backendBaseUrl()}/pest-diagnose`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ fileName }),
  });

  if (!res.ok) {
    throw new Error(`Pest Diagnose API failed (${res.status}): ${await readError(res)}`);
  }

  return (await res.json()) as PestDiagnoseResponse;
}
