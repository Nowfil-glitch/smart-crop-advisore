export type CropRecommendation = {
  id: string;
  name: string;
  imageUrl?: string;
  confidence: number; // 0..1
  yieldLabel: 'Low' | 'Medium' | 'High';
  roiLabel: 'Low' | 'Medium' | 'High';
  waterLabel: 'Low' | 'Medium' | 'High';
  riskLabel: 'Low' | 'Medium' | 'High';
  tags: string[];
  why: { label: string; value: number }[]; // influence factors 0..1
  actions: string[];
};

export type WeatherDay = {
  date: string;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Storm' | 'Fog';
  tempC: number;
  rainProb: number; // 0..1
};

export type WeatherAlert = {
  id: string;
  type: 'Heatwave' | 'Drought' | 'Frost' | 'Heavy Rain';
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  suggestions: string[];
};

export type SoilGuidance = {
  status: {
    n: 'Low' | 'Optimal' | 'High';
    p: 'Low' | 'Optimal' | 'High';
    k: 'Low' | 'Optimal' | 'High';
    ph: 'Low' | 'Optimal' | 'High';
  };
  recommendations: { title: string; dosage: string; timing: string; costHint: string }[];
  organicAlternatives: string[];
};

export type PestDiagnosis = {
  issue: string;
  severity: 'Low' | 'Medium' | 'High';
  organic: string[];
  chemical: string[];
  dosageTiming: string;
};

export type MarketPrice = {
  id: string;
  crop: string;
  unit: string;
  current: number;
  changePct: number;
  series: number[]; // sparkline
  bestTimeToSell: 'Now' | 'Wait 1-2 weeks' | 'Hold';
};

type MockResponse<T> = { data: T; lastUpdated: string };

const latency = (min = 350, max = 900) =>
  new Promise((r) => setTimeout(r, Math.floor(min + Math.random() * (max - min))));

function nowIso() {
  return new Date().toISOString();
}

const cropRecs: CropRecommendation[] = [
  {
    id: 'rice',
    name: 'Rice',
    confidence: 0.82,
    yieldLabel: 'High',
    roiLabel: 'Medium',
    waterLabel: 'High',
    riskLabel: 'Medium',
    tags: ['Best Match', 'Stable'],
    why: [
      { label: 'Season fit', value: 0.86 },
      { label: 'Rainfall', value: 0.74 },
      { label: 'Soil', value: 0.58 },
      { label: 'Budget', value: 0.52 },
    ],
    actions: ['Prepare nursery bed', 'Transplant after first steady rains', 'Split nitrogen application'],
  },
  {
    id: 'maize',
    name: 'Maize',
    confidence: 0.77,
    yieldLabel: 'Medium',
    roiLabel: 'High',
    waterLabel: 'Medium',
    riskLabel: 'Low',
    tags: ['High ROI', 'Low Risk'],
    why: [
      { label: 'Soil', value: 0.73 },
      { label: 'Budget', value: 0.71 },
      { label: 'Season fit', value: 0.66 },
      { label: 'Rainfall', value: 0.55 },
    ],
    actions: ['Use seed treatment', 'Maintain 20–25 cm plant spacing', 'Scout for fall armyworm weekly'],
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    confidence: 0.7,
    yieldLabel: 'Medium',
    roiLabel: 'Medium',
    waterLabel: 'Low',
    riskLabel: 'Medium',
    tags: ['Low Water'],
    why: [
      { label: 'Water need', value: 0.82 },
      { label: 'Soil', value: 0.63 },
      { label: 'Market trend', value: 0.52 },
      { label: 'Season fit', value: 0.51 },
    ],
    actions: ['Apply gypsum at flowering', 'Avoid waterlogging', 'Harvest at 70% maturity'],
  },
];

const weatherDays: WeatherDay[] = Array.from({ length: 7 }).map((_, i) => {
  const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
  const rainProb = Math.max(0, Math.min(1, 0.15 + i * 0.05));
  return {
    date: date.toISOString().slice(0, 10),
    condition: i % 3 === 0 ? 'Rain' : i % 2 === 0 ? 'Cloudy' : 'Sunny',
    tempC: 26 + (i % 3) * 2,
    rainProb,
  };
});

const alerts: WeatherAlert[] = [
  {
    id: 'a1',
    type: 'Heatwave',
    severity: 'Medium',
    message: 'High daytime temperatures expected for 3 days.',
    suggestions: ['Irrigate early morning', 'Mulch to reduce evaporation', 'Avoid fertilizer during peak heat'],
  },
  {
    id: 'a2',
    type: 'Heavy Rain',
    severity: 'Low',
    message: 'Light-to-moderate rain likely this week.',
    suggestions: ['Ensure drainage channels', 'Delay pesticide spray by 24h after rain'],
  },
];

export async function getCropRecommendations(): Promise<MockResponse<CropRecommendation[]>> {
  await latency();
  return { data: cropRecs, lastUpdated: nowIso() };
}

export async function getWeather(): Promise<MockResponse<{ days: WeatherDay[]; alerts: WeatherAlert[] }>> {
  await latency();
  return { data: { days: weatherDays, alerts }, lastUpdated: nowIso() };
}

export async function getSoilGuidance(_input: {
  n?: number;
  p?: number;
  k?: number;
  ph?: number;
}): Promise<MockResponse<SoilGuidance>> {
  await latency();
  return {
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
  };
}

export async function diagnosePest(_fileName: string): Promise<MockResponse<PestDiagnosis>> {
  await latency(900, 1500);
  return {
    data: {
      issue: 'Leaf spot (possible fungal)',
      severity: 'Medium',
      organic: ['Remove heavily infected leaves', 'Spray neem oil solution (1–2%)'],
      chemical: ['Mancozeb as per label', 'Copper-based fungicide as per label'],
      dosageTiming: 'Apply in the evening; repeat after 7–10 days if needed.',
    },
    lastUpdated: nowIso(),
  };
}

const market: MarketPrice[] = [
  {
    id: 'm1',
    crop: 'Rice',
    unit: '₹/quintal',
    current: 2250,
    changePct: 1.8,
    series: [2100, 2120, 2150, 2170, 2200, 2230, 2250],
    bestTimeToSell: 'Now',
  },
  {
    id: 'm2',
    crop: 'Maize',
    unit: '₹/quintal',
    current: 1950,
    changePct: -0.9,
    series: [2000, 2020, 2010, 1980, 1970, 1960, 1950],
    bestTimeToSell: 'Wait 1-2 weeks',
  },
  {
    id: 'm3',
    crop: 'Groundnut',
    unit: '₹/quintal',
    current: 5650,
    changePct: 2.2,
    series: [5200, 5300, 5400, 5480, 5520, 5580, 5650],
    bestTimeToSell: 'Hold',
  },
];

export async function getMarket(): Promise<MockResponse<MarketPrice[]>> {
  await latency();
  return { data: market, lastUpdated: nowIso() };
}
