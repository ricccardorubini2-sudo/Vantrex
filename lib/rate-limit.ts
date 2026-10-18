const hits = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function resetRateLimit() {
  hits.clear();
}

export function allowRequest(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function clientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
