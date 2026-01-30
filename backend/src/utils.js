export function nowIso() {
  return new Date().toISOString();
}

export function latency(min = 350, max = 900) {
  return new Promise((r) => setTimeout(r, Math.floor(min + Math.random() * (max - min))));
}

export function getApiKey(req) {
  const header = req.get('x-api-key') || req.get('authorization');
  if (!header) return null;
  if (header.toLowerCase().startsWith('apikey ')) return header.slice(7).trim();
  return header;
}

export function requireApiKey(req, res, next) {
  const expected = process.env.API_KEY;
  if (!expected) return next();
  const actual = getApiKey(req);
  if (actual !== expected) return res.status(401).json({ error: 'Unauthorized' });
  return next();
}
